

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


/**
* RULE: Assign Classroom based on number subscription
*/
reactor.createRule("assignClassroom", 0, { l: Lesson },
    function (l) {
     
        return l.getDiscipline().getNumStudent() > l.getClassroom().getCapacity();
    },
    function (l) {
        printForDebug(l.getDiscipline().getName() + " " + l.getDiscipline().getNumStudent() + " -- " + l.getClassroom().toString());
        var compatibilityClassroom = checkCapacityClassroom(l.getDiscipline().getNumStudent());
        var newClassRoom = compatibilityClassroom[Math.floor(Math.random() * compatibilityClassroom.length)];
        l.setClassroom(newClassRoom);
        assert(l);

    });

/**
* RULE: Check If the same professor teaching at the same moment
*/
reactor.createRule("avoidUbiquityProfessor", -1, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        var isTaughtBySameProfessor = false;
        for (var i = 0; i < l1.getDiscipline().getProfessor().length; i++) {
            var professor = l1.getDiscipline().getProfessor()[i];
            isTaughtBySameProfessor = professor.checkExistProfessor(l2.getDiscipline().getProfessor(), professor.getId());
            
        }

        return l1 != l2 &&
            l1.getDiscipline().getCourse() != l2.getDiscipline().getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() < l2.getEndLesson() && l1.getEndLesson() > l2.getStartLesson()) &&
            isTaughtBySameProfessor == true;

    },
    function (l1, l2) {
        printForDebug(l1.toString() + " ** " + l2.toString(), "red", "white");
        if (l1.getStartLesson() < l2.getStartLesson()) {

            var dL = l2.getDurationLesson();
            l2.setStartLesson(l1.getEndLesson()); 
            l2.setEndLesson(l2.getStartLesson() + dL);
        }
        else {
            var dL = l1.getDurationLesson();
            l1.setStartLesson(l2.getEndLesson()); 
            l1.setEndLesson(l1.getStartLesson() + dL);
        }
        assert(timetable);
    });

/**
 * ***********************************************************************
 * ***************************** PRIORITY -1 *****************************
 * *********************************************************************** 
 */
// if l1 != l2 && l1.getCourse() == l2.getCourse() && l1.getOblicatory() == true && l2.getObligaotory() == true
// && l1.getLesson.getCurriculum == l2.getLesson.getCurriculum
// reactor.createRule("overlapCurriculum", -1, { l1: Lesson, l2: Lesson },
//     function (l1, l2) {

//         var belongToSameCurriculum = false;
//         for(var i = 0; i < l1.getCurriculum().length; i++){
//             belongToSameCurriculum = l2.getExistCurriculum(l1.getCurriculum()[i])
//         }
//         return l1 != l2 &&
//         l1.getCourse() == l2.getCourse() &&
//         l1.getDay() == l2.getDay() &&
//         l1.getObligatory() == true && l2.getObligatory() == true && 
//         belongToSameCurriculum==true ;
//     },
//     function (l1, l2) {
//         if (l1.getStartLesson() < l2.getStartLesson()) {

//             var dL = l2.getDurationLesson();
//             l2.setStartLesson(l1.getEndLesson()); // METTERCI + 15 minuti di differenza
//             l2.setEndLesson(l2.getStartLesson() + dL);
//         }
//         else {
//             var dL = l1.getDurationLesson();
//             l1.setStartLesson(l2.getEndLesson()); // METTERCI + 15 minuti di differenza
//             l1.setEndLesson(l1.getStartLesson() + dL);
//         }



//     });
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
            l1.getDiscipline().getCourse() == l2.getDiscipline().getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() <= l2.getEndLesson() && l1.getEndLesson() >= l2.getStartLesson());

    },
    function (l1, l2) {
        if (l1.getStartLesson() < l2.getStartLesson()) {

            var dL = l2.getDurationLesson();
            l2.setStartLesson(l1.getEndLesson()); 
            l2.setEndLesson(l2.getStartLesson() + dL);
        }
        else {
            var dL = l1.getDurationLesson();
            l1.setStartLesson(l2.getEndLesson()); 
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
            l1.getDiscipline().getCourse() != l2.getDiscipline().getCourse() &&
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
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom());
        l.setDurationLesson(2);
        timetable.tt.push(newL);
    });

// split the duration lessons of 5 h into two days 
reactor.createRule("spliDurationLesson5H", -2, { l: Lesson },
    function (l) {
        if (l.getDurationLesson() == 5) return true;
    }, function (l) {
        var randomD = randomIntFromInterval(2, 3);
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + randomD, l.getClassroom());
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
        // new Lesson(generateDay(l.getDay()), l.getDiscipline(),l.getProfessor(), START_LESSONS, START_LESSONS + randomD, l.getClassroom(), l.getCourse(), l.getNumStudent());
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(),START_LESSONS, START_LESSONS + 2, l.getClassroom());
        var newL2 = new Lesson(generateDay(l.getDay()), l.getDiscipline(),START_LESSONS, START_LESSONS + 2, l.getClassroom());
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


for (var i = 0; i < subject.length; i++) {
    var randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
    // TODO -----------> RICORDA SE LO CAMBI QUI LO CAMBI PURE NELLO SPLITLESSONS. 
    // TODO --> tolto obbligatorieta e curriculum. timetable.tt.push(new Lesson("Monday", subject[i].getName(), START_LESSONS, START_LESSONS + DURATION_LESSON, rClass, subject[i].getCourse(), subject[i].getCurriculum(), subject[i].getObligatory(), subject[i].getNumStudent()));
    timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + DURATION_LESSON, randomClassroom));

}


// var o = JSON.stringify({ timetable }, null, " ");
// console.log(o);

assert(timetable);
reactor.run(Infinity, true, function () {
    printForDebug("END");
    // var output = JSON.stringify({ timetable }, null, " ");
    // console.log(output);

    for (var i = 0; i < timetable.tt.length; i++) {
        var numDay = defineDayNumber(timetable.tt[i].getDay());
        var newEvent = {
            start: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getStartLesson(), 'h').add(00, 'm').format('X'),
            end: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getEndLesson(), 'h').format('X'),
            title: timetable.tt[i].getDiscipline().getName() + ' - ' + timetable.tt[i].getClassroom().getName(),
            content: "AULA:" + timetable.tt[i].getClassroom() + "<br>" +
                "CORSO: " + timetable.tt[i].getDiscipline().getCourse() + "<br>" + // TODO gestire i professori multipli
                "PROFESSORE " + timetable.tt[i].getDiscipline().getProfessor()[0].getCompleteName(),//'Hello World! <br> <p>Foo Bar</p>',
            category: timetable.tt[i].getDiscipline().getCourse()
        }
        events.push(newEvent);
    }
    calendar.init();
});


