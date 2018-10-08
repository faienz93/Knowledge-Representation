

// DOMAIN= Come primo parametro prende quelle che sono le classi che devono essere prese
// BOOST = Questo può aumentare le prestazioni fino al 25%; tuttavia, i punti di interruzione impostati nelle condizioni delle regole non funzioneranno più.
//  Quindi, questo dovrebbe essere un passo finale nello sviluppo.
var reactor = new RuleReactor();

function assert() { return reactor.assert.apply(reactor, arguments); }
function not() { return reactor.not.apply(reactor, arguments); }
function exists() { return reactor.exists.apply(reactor, arguments); }
function forAll() { return reactor.forAll.apply(reactor, arguments); }

// https://github.com/anywhichway/rule-reactor#debugging-and-testing
reactor.trace(0);


/**
 * **********************************************************************
 * ***************************** PRIORITY 0 *****************************
 * ********************************************************************** 
 */

reactor.createRule("checkDuplicatedDay", 0, { l: TimetableArray },
    function (l) {
        var valueArr = l.tt.map(function (item) { return item.day });
        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item, idx + 1) !== -1
        });
        return isDuplicate;
    },
    function (l) {
        for (var i = 0; i <= l.tt.length - 1; i++) {
            assert(l.tt[i]);
        }
    });


/**
 * If lesson start after the 18:00 then swap to next Day
 */
reactor.createRule("swapDay", 0, { l: Lesson },
    function (l) {
        // printForDebug(l.getDiscipline() + " " + l.getStartLesson() + " " + l.startLesson) ;
        return l.getStartLesson() >= END_LESSONS;

    },
    function (l) {

        var dL = l.getDurationLesson();
        // qui setto alle 9 perchè tanto poi anche se si sovrappongono due materie che iniziano entrambe alle 9
        // allora rientra in regola la prima rule: overlapTimeSlot
        l.setStartLesson(START_LESSONS);
        l.setEndLesson(START_LESSONS + dL);

        // se le precendenti righe fossero commentate si avrebbe una lezione il martedi e un altra 
        // il mercoledi. Questo risulta ovvio in quanto l'ultimo giorno sarebbe letto due volte per via 
        // della condizione l1.getStartLesson() > 18) che si ripete
        var actualDay = l.getDay();
        l.setDay(actualDay, 1);
    });

// if l1 != l2 && l1.getCourse() == l2.getCourse() && l1.getOblicatory() == true && l2.getObligaotory() == true
// && l1.getLesson.getCurriculum == l2.getLesson.getCurriculum

/**
 * ***********************************************************************
 * ***************************** PRIORITY -1 *****************************
 * *********************************************************************** 
 */

/**
 * RULE: check if:
 * - the discipline are different
 * - is of same Course
 * - are thought in the same day
 * - overlap the time slot
 * In this case, switch the time slot to make it consequential
 */
reactor.createRule("overlapTimeSlot", -1, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        return l1 != l2 &&
            l1.getCourse() == l2.getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() <= l2.getEndLesson() && l1.getEndLesson() >= l2.getStartLesson());

    },
    function (l1, l2) {
        if (l1.getStartLesson() < l2.getStartLesson()) {

            var dL = l2.getDurationLesson();
            l2.setStartLesson(l1.getEndLesson()); // METTERCI + 15 minuti di differenza
            l2.setEndLesson(l2.getStartLesson() + dL);
        }
        else {
            var dL = l1.getDurationLesson();
            l1.setStartLesson(l2.getEndLesson()); // METTERCI + 15 minuti di differenza
            l1.setEndLesson(l1.getStartLesson() + dL);
        }

    });

/**
* RULE: check: 
* - diffent lessons
* - diffetent Course
* - same ClassRoom
* This rule has -1 priority: it can be execute after the other
*/
reactor.createRule("checkClassroomOccupied", -1, { l1: Lesson, l2: Lesson },
    function (l1, l2) {

        return l1 != l2 &&
            l1.getCourse() != l2.getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() < l2.getEndLesson() && l1.getEndLesson() > l2.getStartLesson()) &&
            l1.getClassroom() == l2.getClassroom();
    },
    function (l1, l2) {

        printForDebug(l1.toString() + " " + l2.toString(), "white", "black");



        var dL = l2.getDurationLesson();
        l2.setStartLesson(l1.getEndLesson());
        l2.setEndLesson(l2.getStartLesson() + dL);
        // assert([l1, l2]); 
        assert(timetable);
    });

/**
 * ***********************************************************************
 * ***************************** PRIORITY -2 *****************************
 * *********************************************************************** 
 */

// split the duration lessons of 4 h into two days 
reactor.createRule("spliDurationLesson4H", -2, { l: Lesson },
    function (l) {
        if (l.getDurationLesson() == 4) return true;
    }, function (l) {
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        l.setDurationLesson(2);
        timetable.tt.push(newL);
    });

// split the duration lessons of 5 h into two days 
reactor.createRule("spliDurationLesson5H", -2, { l: Lesson },
    function (l) {
        if (l.getDurationLesson() == 5) return true;
    }, function (l) {
        var randomD = randomIntFromInterval(2, 3);
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + randomD, l.getClassroom(), l.getCourse());
        l.setDurationLesson(5 - randomD);
        timetable.tt.push(newL);
    });

/**
 * split the duration lessons of 6 h .
 * The solution are two:  
 *  - split lesson in three days (2 - 2 - 2)
 *  - split lesson in two days (4 - 2) for laboratory.
 *    This case is inclused into the first. In fact the function @generateDay 
 *    exlude alway the same day and for this can be the case 2 2 2 or 4 2
 *  
 */
reactor.createRule("spliDurationLesson6H", -2, { l: Lesson },
    function (l) {
        return l.getDurationLesson() == 6;
    },
    function (l) {
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        var newL2 = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        l.setDurationLesson(2);
        if (newL.getDay() == newL2.getDay()) {
            newL2.setClassroom(newL.getClassroom());
        }
        timetable.tt.push(newL);
        timetable.tt.push(newL2);

    });

reactor.createRule("stop", -100, {},
    function () {
        return not(exists({ timetable: TimetableArray },
            function (timetable) { return timetable.tt == null; }));
    },
    function () {
        reactor.stop();
    });


/**
 * **********************************************************
 * END RULE 
 * **********************************************************
 */

/**
 * NUMBER OF WEEK OF LESSONS
 */

// i.e. 24/09/2018
var startWeek = moment(2018 + "/" + 09 + "/" + 24, 'YYYY-MM-DD');

// i.e 14/12/2018
var endWeeek = moment(2018 + "/" + 12 + "/" + 14, 'YYYY-MM-DD');
var numberOfWeek = endWeeek.diff(startWeek, 'week');
console.log("Numero di settimane di lezione " + numberOfWeek);
/**
 ******************************************************************
 */

var timetable = new TimetableArray();






// id, name
var infoman = new Course(8014, "Informatica per il Management");
var info = new Course(8009, "Informatica Triennale");
var infolm = new Course(8028, "Informatica Magistrale");
var infolmcurrA = new Course(8028, "Informatica Magistrale", "A", "Tecniche del Software");
var infolmcurrB = new Course(8028, "Informatica Magistrale", "B", "Informatica per il management");
var infolmcurrC = new Course(8028, "Informatica Magistrale", "C", "Sistemi e Reti");

// Discipline(id, abbreviation ,name, semester, obligatory, totalHours, weeksHours, cfu, year) {
var cbd = new Discipline("28796", "CBD", "COMPLEMENTI DI BASI DI DATI", "1", true, 60, 5, 6, 1);
var uux = new Discipline("81670", "UUX", "USABILITA E USER EXPERIENCE", "1", true, 60, 6, 6, 1);
var gmb = new Discipline("81960", "TG", "GIOCHI E MODELLI BOOLEANI", "1", true, 60, 6, 6, 1);
var ap = new Discipline("81668", "AA", "ALGORITMI PARALLELI", "1", true, 60, 6, 6, 1);
var isos = new Discipline("77803", "ISOS", "INGEGNERIA DEL SOFTWARE ORIENTATA AI SERVIZI", "1", false, 50, 5, 6, 1);
var fsc = new Discipline("23762", "FSC", "FISICA DEI SISTEMI COMPLESSI", "1", false, 50, 5, 6, 1);
var sds = new Discipline("37760", "SDS", "SIMULAZIONE DI SISTEMI", "1", false, 50, 5, 6, 1);

// firstName,surName,id_professor,role
var dm = new Professor("Danilo", "Montesi", 211832, "ordinario");
var fv = new Professor("Fabio", "Vitali", 150348, "ordinario");
var gr = new Professor("Giovanni", "Rossi", 000002, "contratto");
var ab = new Professor("Alan Albert", "Bertossi", 295601, "ordinario");
var dr = new Professor("Davide", "Rossi", 000003, "contratto");
var sr = new Professor("Sandro", "Rambaldi", 841964, "associato");
var ld = new Professor("Lorenzo", "Donatiello", 000005, "ordinario");





///////////////////////////////////////////////////////////
cbd.addTeacher(dm);
uux.addTeacher(fv);
gmb.addTeacher(gr);
ap.addTeacher(ab);
isos.addTeacher(dr);
fsc.addTeacher(sr);
sds.addTeacher(ld);

// cbd.addCourse(infolmcurrA);
// cbd.addCourse(infolmcurrB);
// cbd.addCourse(infolmcurrC);
// uux.addCourse(infolmcurrA);
// uux.addCourse(infolmcurrB);
// uux.addCourse(infolmcurrC);

// gmb.addCourse(infolmcurrB);
// ap.addCourse(infolmcurrA);
// ap.addCourse(infolmcurrC);
// isos.addCourse(infolm);
// fsc.addCourse(infolm);
// sds.addCourse(infolm);


// INFOMAN
var di = new Discipline("28796", "DI", "Diritto di Internet", "1", true, 60, 5, 6, 1);
var ea = new Discipline("28797", "EA", "Economia Aziendale", "1", true, 60, 5, 6, 1);
var am = new Discipline("28798", "AM", "Analisis Matematica", "1", true, 60, 5, 6, 1);
di.addCourse(infoman);
ea.addCourse(infoman);
am.addCourse(infoman);

// INFORMATICA TRIENNALE
var p = new Discipline("28799", "P", "Programmazione", "1", true, 60, 5, 6, 1);
var o = new Discipline("28800", "O", "Ottimizzazione", "1", true, 60, 5, 6, 1);
var cn = new Discipline("28801", "CN", "Calcolo Numerico", "1", true, 60, 5, 6, 1);
p.addCourse(info);
o.addCourse(info);
cn.addCourse(info);


var subject = [];
subject.push(di);
subject.push(ea);
subject.push(am);
subject.push(p);
subject.push(o);
subject.push(cn);

// MAGISTRALE
subject.push(cbd);
subject.push(uux);
subject.push(gmb)
subject.push(ap);
subject.push(isos);
subject.push(fsc);
subject.push(sds);

for (var i = 0; i < subject.length; i++) {
    
//    console.log(subject.toString());
   var rClass = classrooms[Math.floor(Math.random() * classrooms.length)];
   timetable.tt.push(new Lesson("Monday", subject[i].getName(), START_LESSONS, START_LESSONS + DURATION_LESSON, rClass, subject[i].getCourse()))
}

// for(var i = 0; i < timetable.tt.length; i++) {
//     console.log(timetable.tt[i].toString());
// }



// console.log(timetable.tt[0].toString());
// console.log(timetable.tt[0].getCourse());
// console.log(timetable.tt[0].getCourse()[0].getId());
// console.log(timetable.tt[0].getCourse()[0].getName());



var orari = []
for (var i = START_LESSONS; i < END_LESSONS; i++) {
    orari.push(new Date(null, null, null, i).getHours());
}

// =====================
// RANDOM
// ====================
// for (var i = 0; i < nomiMaterie.length; i++) {
//     var rDay = days[Math.floor(Math.random() * days.length)];
//     var rClass = classrooms[Math.floor(Math.random() * classrooms.length)];
//     var rHour = orari[Math.floor(Math.random() * orari.length)];
//     var rDurate = 2 + Math.round(Math.random());
//     timetable.tt.push(new Lesson(rDay, nomiMaterie[i], rHour, rHour + rDurate, rClass))
// }

// =====================
// START MONDAY
// ====================
// for (var i = 0; i < nomiMaterie.length; i++) {
//     var rClass = classrooms[Math.floor(Math.random() * classrooms.length)];
//     timetable.tt.push(new Lesson("Monday", nomiMaterie[i], START_LESSONS, START_LESSONS + DURATION_LESSON, rClass, "8028B"))
// }

// for (var i = 0; i < nomiMaterieInfoMan.length; i++) {
//     var rClass = classrooms[Math.floor(Math.random() * classrooms.length)];
//     timetable.tt.push(new Lesson("Monday", nomiMaterieInfoMan[i], START_LESSONS, START_LESSONS + DURATION_LESSON, rClass, "8014"))
// }

// for (var i = 0; i < nomiMaterieInfoTriennale.length; i++) {
//     var rClass = classrooms[Math.floor(Math.random() * classrooms.length)];
//     timetable.tt.push(new Lesson("Monday", nomiMaterieInfoTriennale[i], START_LESSONS, START_LESSONS + DURATION_LESSON, rClass, "8009"))
// }

var o = JSON.stringify({ timetable }, null, " ");
console.log(o);

assert(timetable);
reactor.run(Infinity, true, function () {
    printForDebug("END");
    var output = JSON.stringify({ timetable }, null, " ");
    console.log(output);

    for (var i = 0; i < timetable.tt.length; i++) {
        var numDay = defineDayNumber(timetable.tt[i].getDay());
        var newEvent = {
            start: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getStartLesson(), 'h').add(00, 'm').format('X'),
            end: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getEndLesson(), 'h').format('X'),
            title: timetable.tt[i].getDiscipline() + ' - ' + timetable.tt[i].getClassroom(),
            content: "AULA:" + timetable.tt[i].getClassroom() + "<br>" + "CORSO: " + timetable.tt[i].getCourse(),//'Hello World! <br> <p>Foo Bar</p>',
            category: timetable.tt[i].getCourse()[0]
        }
        events.push(newEvent);
    }
    calendar.init();
});


