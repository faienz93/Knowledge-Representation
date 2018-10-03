
// define the business object model consisting of
// Day, Timetable, Professor, Discipline. 



function Lesson(day, discipline, startLesson, endLesson, classroom, course) {
    this.day = day;
    this.discipline = discipline;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;
    this.course = course;

    this.getDay = function () {
        return this.day;
    }

    this.getDiscipline = function () {
        return this.discipline;
    }

    this.getStartLesson = function () {
        return this.startLesson;
    }

    this.getEndLesson = function () {
        return this.endLesson;
    }

    this.getDurationLesson = function () {
        return this.endLesson - this.startLesson;
    }

    this.getClassroom = function () {
        return this.classroom;
    }

    this.getCourse = function () {
        return this.course;
    }


    this.setDurationLesson = function (dur) {
        this.endLesson = this.startLesson + dur;
    }

    this.setDay = function (d) {
        this.day = d;
    }

    this.setDay = function (dString, dNumber) {
        // i.e Monday return 1
        var dNum = defineDayNumber(dString);

        // i.e 5 return Friday
        var dStr = defineDayString(dNum + dNumber);
        this.day = dStr;
    }

    this.setStartLesson = function (sl) {
        this.startLesson = sl;
    }

    this.setEndLesson = function (el) {
        this.endLesson = el;
    }



    // this.generateTimeSlot = function () {
    //     var orari = []
    //     for (var i = START_LESSONS; i < END_LESSONS; i++) {
    //         orari.push(new Date(null, null, null, i).getHours());
    //     }


    //     var rHour = orari[Math.floor(Math.random() * orari.length)];
    //     // var rDurate = 2 + Math.round(Math.random());
    //     // timetable.tt.push(new Lesson(rDay, nomiMaterie[i], rHour, rHour + rDurate, rClass));
    //     return rHour;

    // }

    this.toString = function () {
        this.classroom = classroom;
        var printO = this.day + " " + this.discipline + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;
        return JSON.stringify(printO);
    }
}


function TimetableArray() {
    this.tt = [];
}

// firstName,surName,id_professor,role
function Professor(firstName, surname, id, role) {
    this.firstName = firstName;
    this.surname = surname;
    this.id = id;
    this.role = role;

    this.nolessons = null;

    this.getFirstName = function () {
        return this.firstName;
    };
}

// id_discipline,disciplineName,semester,obligatory,totalHours,weeksHours,cfu,year,course,teacher
function Discipline(id, name, semester, obligatory, totalHours, weeksHours, cfu, year) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.teacher = null;

    this.getName = function () {
        return this.name;
    };

}

// id_room,className,address,capacity,wifi,wired
function Classroom(id, name, address, capacity, wifi, wired) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.wifi = wifi;
    this.wired = wired;
}


function Course(id, name) {
    this.id = id;
    this.name = name;

    this.discipline = [];

    this.getDiscipline = function () {
        return this.discipline;
    };
}

// DOMAIN= Come primo parametro prende quelle che sono le classi che devono essere prese
// BOOST = Questo può aumentare le prestazioni fino al 25%; tuttavia, i punti di interruzione impostati nelle condizioni delle regole non funzioneranno più.
//  Quindi, questo dovrebbe essere un passo finale nello sviluppo.
var reactor = new RuleReactor();

function assert() { return reactor.assert.apply(reactor, arguments); }
function not() { return reactor.not.apply(reactor, arguments); }
function exists() { return reactor.exists.apply(reactor, arguments); }
function forAll() { return reactor.forAll.apply(reactor, arguments); }

// https://github.com/anywhichway/rule-reactor#debugging-and-testing
reactor.trace(3);




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


reactor.createRule("overlapTimeSlot", 0, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        return l1 != l2 &&
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

reactor.createRule("swapDay", 0, { l: Lesson },
    function (l) {
        // printForDebug(l);
        // printForDebug(l.getDiscipline() + " " + l.getStartLesson() + " " + l.startLesson) ;
        return l.getStartLesson() >= 18;

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

// split the duration lessons of 5 h into two days 
reactor.createRule("spliDurationLesson4H", 0, { l: Lesson },
    function (l) {
        if (l.getDurationLesson() == 4) return true;
    }, function (l) {
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        l.setDurationLesson(2);
        timetable.tt.push(newL);
    });

// split the duration lessons of 5 h into two days 
reactor.createRule("spliDurationLesson5H", 0, { l: Lesson },
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
reactor.createRule("spliDurationLesson6H", 0, { l: Lesson },
    function (l) {
        return l.getDurationLesson() == 6;
    },
    function (l) {
        var newL = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        var newL2 = new Lesson(generateDay(l.getDay()), l.getDiscipline(), START_LESSONS, START_LESSONS + 2, l.getClassroom(), l.getCourse());
        l.setDurationLesson(2);
        timetable.tt.push(newL);
        timetable.tt.push(newL2);

    });

reactor.createRule("stop", -1, {},
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

var giorni = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MSC', 'MAT', 'COM', 'UUX'];
var nomiMaterie = ['RDC', 'SM', 'IOT', 'MAT'];
var aule = ['Aula Ercolani 1', 'Aula Ercolani 2', 'Aula Ercolani 3', 'Lab Ercolani', 'Ranzani', 'Vitali'];

var orari = []
for (var i = START_LESSONS; i < END_LESSONS; i++) {
    orari.push(new Date(null, null, null, i).getHours());
}

// =====================
// RANDOM
// ====================
// for (var i = 0; i < nomiMaterie.length; i++) {
//     var rDay = giorni[Math.floor(Math.random() * giorni.length)];
//     var rClass = aule[Math.floor(Math.random() * aule.length)];
//     var rHour = orari[Math.floor(Math.random() * orari.length)];
//     var rDurate = 2 + Math.round(Math.random());
//     timetable.tt.push(new Lesson(rDay, nomiMaterie[i], rHour, rHour + rDurate, rClass))
// }

// =====================
// START MONDAY
// ====================
for (var i = 0; i < nomiMaterie.length; i++) {
    var rDay = giorni[Math.floor(Math.random() * giorni.length)];
    var rClass = aule[Math.floor(Math.random() * aule.length)];
    var rHour = orari[Math.floor(Math.random() * orari.length)];
    var rDurate = 2 + Math.round(Math.random());
    timetable.tt.push(new Lesson("Monday", nomiMaterie[i], START_LESSONS, START_LESSONS + 4, rClass, "8028B"))
}

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
            title: timetable.tt[i].discipline + ' - ' + timetable.tt[i].getClassroom(),
            content: "AULA:" + timetable.tt[i].getClassroom() + "<br>" + "CORSO: " + timetable.tt[i].getCourse(),//'Hello World! <br> <p>Foo Bar</p>',
            category: timetable.tt[i].getCourse()
        }
        events.push(newEvent);
    }
    calendar.init();
});



