

// DOMAIN= Come primo parametro prende quelle che sono le classi che devono essere prese
// BOOST = Questo può aumentare le prestazioni fino al 25%; tuttavia, i punti di interruzione impostati nelle condizioni delle regole non funzioneranno più.
//  Quindi, questo dovrebbe essere un passo finale nello sviluppo.
// var reactor = new RuleReactor();
var reactor = new RuleReactor({ Lesson: Lesson }, true);

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

/**
 * Check if exist overlapping lessons for the same day. In this case call assert and check if
 * respect the other rule 
 * REF: https://stackoverflow.com/a/30735838
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
 * ***********************************************************************
 * ***************************** PRIORITY -1 *****************************
 * *********************************************************************** 
 */

/**
 * If lesson start after the 18:00 then swap to next Day
 */
reactor.createRule("swapDay", -1, { l: Lesson },
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
        l.setNewDay(actualDay, 1);
    });


/**
* RULE: Assign Classroom based on number subscription
*/
reactor.createRule("assignClassroom", -1, { l: Lesson },
    function (l) {
        return l.getDiscipline().getNumStudent() > l.getClassroom().getCapacity();
    },
    function (l) {
        printForDebug("ASSIGNCLASSROOM " + l.getDiscipline().getName() + " " + l.getDiscipline().getNumStudent() + " -- " + l.getClassroom().toString());
        var compatibilityClassroom = checkCapacityClassroom(l.getDiscipline().getNumStudent());
        var newClassRoom = compatibilityClassroom[Math.floor(Math.random() * compatibilityClassroom.length)];
        l.setClassroom(newClassRoom);
        assert(timetable);

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

        printForDebug("CLASSROOMOCCUPIED " + l1.toString() + " " + l2.toString(), "white", "black");

        var dL = l2.getDurationLesson();
        l2.setStartLesson(l1.getEndLesson());
        l2.setEndLesson(l2.getStartLesson() + dL);
        // assert([l1, l2]); 
        assert(timetable);
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
        printForDebug("UBIQUITY: " + l1.toString() + " ** " + l2.toString(), "red", "white");
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
 * Avoid that the same lesson is taught in the same day
 */
reactor.createRule("NOSameLessonSameDay", -1, { l1: Lesson, l2: Lesson },
    function (l1, l2) {

        return l1 != l2 &&
            l1.getDiscipline().getName() == l2.getDiscipline().getName() && l1.getDay() == l2.getDay();
    },
    function (l1, l2) {

        printForDebug("NOSameLessonSameDay " + l1.toString() + " " + l2.toString(), "white", "pink");
        // var actualDayToAvoid = l2.getDay();
        // l1.setDay(generateDayByExcludingOne(actualDayToAvoid));
        l2.setNewDay(l1.getDay(),1);
        assert(timetable);
    });



/**
 * ********************************************************************************
 * ***************************** PREFERENCE PROFESSOR *****************************
 * ******************************************************************************** 
 */

/**
* RULE: Check From Preference if exist a particular day where the professor doesn't want doing a lesson
*/
reactor.createRule("avoidLessonDay", -1, { l: Lesson },
    function (l) {
        // check if exist preference with specific key
        var existLessotToAvoid = l.getDiscipline().checkExistPreference("avoidLessonDay");
        var existIncompatibilyDay = l.getDiscipline().checkIncompatibilyDay(l.getDay());
        return existLessotToAvoid && existIncompatibilyDay;

    },
    function (l) {
        printForDebug("AVOIDLESSON " + l.getDiscipline().getName() + " " + l.getDay(), "white", "blue");
        
        var actualDayToAvoid = l.getDay();
        var dL = l.getDurationLesson();
        l.setStartLesson(START_LESSONS);
        l.setEndLesson(START_LESSONS + dL);
        l.setDay(generateDayByExcludingOne(actualDayToAvoid));
        assert(timetable);

    });

/**
 * RULE: split lessons in days consecutive - Start Week. 
 */
reactor.createRule("consecutiveLessonsStartWeek", -1, { l: Lesson },
    function (l) {

        var middleday;
        if (l.getDurationLesson() == 2 && l.getDiscipline().getWeeksHours() == 6) { middleday = defineDayNumber("Wednesday"); }
        else { middleday = defineDayNumber("Tuesday"); }

        var existConsecutiveDay = l.getDiscipline().checkExistPreference("consecutiveday");
        var periodOfWeek = l.getDiscipline().getChoiceConsecutiveDay("startweek");

        var dayNumber = defineDayNumber(l.getDay());
        return existConsecutiveDay && (periodOfWeek == "startweek") && dayNumber > middleday;
        
    },
    function (l) {
        printForDebug("consecutiveLessons " + l.getDiscipline().getName() + " " + JSON.stringify(l.getDiscipline().getPreference()), "black", "pink");
        l.setDay("Monday");
        assert(timetable);
    });

/**
 * RULE: split lessons in days consecutive - End Week. 
 */
reactor.createRule("consecutiveLessonsEndWeek", -1, { l: Lesson },
    function (l) {

        var middleday;
        if (l.getDurationLesson() == 2 && l.getDiscipline().getWeeksHours() == 6) { middleday = defineDayNumber("Wednesday"); }
        else { middleday = defineDayNumber("Thursday"); }

        var existConsecutiveDay = l.getDiscipline().checkExistPreference("consecutiveday");
        var periodOfWeek = l.getDiscipline().getChoiceConsecutiveDay("endweek");

        var dayNumber = defineDayNumber(l.getDay());
        return existConsecutiveDay && (periodOfWeek == "endweek") && dayNumber < middleday;

    },
    function (l) {
        printForDebug("consecutiveLessons " + l.getDiscipline().getName() + " " + JSON.stringify(l.getDiscipline().getPreference()), "black", "pink");
        if (l.getDurationLesson() == 2 && l.getDiscipline().getWeeksHours() == 6) { l.setDay("Wednesday"); }
        else { l.setDay("Thursday"); }
        // l1.setDay("Thursday");
        assert(timetable);


    });

/**
 * TODO: NON VA BENE
* RULE: Set the lesson in the morning
*/
reactor.createRule("setPeriodOfDayAM", -1, { l: Lesson },
    function (l) {
        var setPreference;
        
        if (l.getDiscipline().checkExistPreference("setperiodofday")) {
            setPreference = l.getDiscipline().getPeriodOfDay("AM");
        }
        return setPreference == "AM" && l.getStartLesson() > 12;
    },
    function (l) {
        printForDebug("SETPERIODOFDAY_AM " + l.getDiscipline().getName() + " " + l.getDiscipline().getProfessor()[0].toString(), "white", "red");
       
        if (l.getStartLesson() >= 12) { 
            var actualDay = l.getDay();
            l.setNewDay(actualDay, 1);
        }

        var dL = l.getDurationLesson();
        l.setStartLesson(START_LESSONS);
        l.setEndLesson(START_LESSONS + dL);
        assert(timetable);
    });

/**
* RULE: Set the lesson at the afternoon
*/
reactor.createRule("setPeriodOfDayPM", -1, { l: Lesson },
    function (l) {
        var setPreference;
        if (l.getDiscipline().checkExistPreference("setperiodofday")) {
            setPreference = l.getDiscipline().getPeriodOfDay("PM");
        }
        return setPreference == "PM" && l.getStartLesson() < 13;
    },
    function (l) {
        printForDebug("SETPERIODOFDAY_PM " + l.getDiscipline().getName() + " " + l.getDiscipline().getProfessor()[0].toString(), "white", "green");
        var dL = l.getDurationLesson();
        l.setStartLesson(13);
        l.setEndLesson(13 + dL);
        // assert(timetable);
    });



/**
* RULE: Professor set a classroom preference with chalk    * 
*/
reactor.createRule("checkClassroomChalk", -1, { l: Lesson },
    function (l) {
        return l.getClassroom().getChalk() != l.getDiscipline().getChalkClass() &&
            l.getDiscipline().checkExistPreference("chalkclass");
    },
    function (l) {

        var compatibilityRooms = [];
        for (var i = 0; i < classrooms.length; i++) {
            if (classrooms[i].getChalk() == l.getDiscipline().getChalkClass()) {
                compatibilityRooms.push(classrooms[i]);
            }
        }
        var randomClassroom = compatibilityRooms[Math.floor(Math.random() * compatibilityRooms.length)];
        l.setClassroom(randomClassroom);
    });



/**
 * Rule for the end lesson over 19 
 */

reactor.createRule("maxLessonEnd", -2, { l: Lesson },
    function (l) {
        var slotLesson = l.getStartLesson() + l.getDurationLesson();
        return slotLesson >= 20;
    },
    function (l) {
        var dL = l.getDurationLesson();
        printForDebug(l, "blue", "white");
        l.getStartLesson()
        l.setDay(generateDayByExcludingOne(l.getDay()));
        l.setStartLesson(9);
        l.setEndLesson(9 + dL);
        //   printForDebug(l,"white","black");
        assert(timetable);
    });



/**
 * RULE: Break hour for a course if it has more of 5 hours consecutive (function in util) * 
 */
reactor.createRule("studentBreakForCourse", -2, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        var count = 0;
        if (l1 != l2 &&
            l1.getDay() == l2.getDay() &&
            l1.getDiscipline().getCourse() == l2.getDiscipline().getCourse() &&
            l1.getEndLesson() == l2.getStartLesson()) {
            count = countHoursBetween(l2.getDiscipline().getCourse(), l2.getDay(), l1.getStartLesson(), l2.getEndLesson());
        }
        return count > 5;

    },
    function (l2) {
        var dL = l2.getDurationLesson();
        var newStart = l2.getStartLesson() + 1;
        l2.setStartLesson(newStart);
        l2.setEndLesson(newStart + dL);
        assert(timetable);
    });
/**
 * *********************************************************************
 * ***************************** STOP RULE *****************************
 * ********************************************************************* 
 */

reactor.createRule("stop", -100, {},
    function () {
        return not(exists({ timetable: TimetableArray },
            function (timetable) { return timetable.tt == null; }));
    },
    function () {
            reactor.stop();
            //console.log(queryDisciplineProfessor("77803"));
           
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
// var startWeek = moment(2018 + "/" + 09 + "/" + 24, 'YYYY-MM-DD');

// // i.e 14/12/2018
// var endWeeek = moment(2018 + "/" + 12 + "/" + 14, 'YYYY-MM-DD');
// var numberOfWeek = endWeeek.diff(startWeek, 'week');
// console.log("Numero di settimane di lezione " + numberOfWeek);
/**
 ******************************************************************
 */

var timetable = new TimetableArray();


for (var i = 0; i < subject.length; i++) {
    var randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
    // var randomDay = days[Math.floor(Math.random() * days.length)];
    // var subjectWeeksHours=subject[i].getWeeksHours();
    var subjectWeeksHours = DURATION_LESSON;
    if (subjectWeeksHours < 4) {
        timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
    }
    if (subjectWeeksHours == 4) {
        timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
    }
    if (subjectWeeksHours == 5) {
        timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
        timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
    }
    if (subjectWeeksHours == 6) {

        if (subject[i].getSplitDuration(2)) {

            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        else if (subject[i].getSplitDuration(3)) {

            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
        }
        else {
            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            timetable.tt.push(new Lesson("Monday", subject[i], START_LESSONS, START_LESSONS + 4, randomClassroom));
        }

    }

}

// var ciao = getProfessorById("000001");
// console.log(ciao);

// var o = JSON.stringify({ timetable }, null, " ");
// console.log(o);

assert(timetable);
reactor.run(Infinity, true, function () {


    // for (var i=0;i<courses.length;i++){
    // printForDebug(minCountHours(courses[i].getId()),"red","white")
    // }
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
                "PROFESSORE " + timetable.tt[i].getDiscipline().getAllProfessor(),//'Hello World! <br> <p>Foo Bar</p>',
            category: timetable.tt[i].getDiscipline().getCourse()
        }
        events.push(newEvent);
    }
    calendar.init();
});


