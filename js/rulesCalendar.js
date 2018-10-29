
// var reactor = new RuleReactor();
var reactor = new RuleReactor({TimetableArray:TimetableArray, Lesson:Lesson},true);

function assert() { return reactor.assert.apply(reactor, arguments); }
function not() { return reactor.not.apply(reactor, arguments); }
function exists() { return reactor.exists.apply(reactor, arguments); }
function forAll() { return reactor.forAll.apply(reactor, arguments); }

// https://github.com/anywhichway/rule-reactor#debugging-and-testing
reactor.trace(1);


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
        // console.log(l.tt.toString());
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
        return l.getStartLesson() >= END_LESSONS;
    },
    function (l) {
        var dL = l.getDurationLesson();        
        l.setStartLesson(START_LESSONS);
        l.setEndLesson(START_LESSONS + dL);        
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
        // printForDebug("ASSIGNCLASSROOM " + l.getDiscipline().getName() + " " + l.getDiscipline().getNumStudent() + " -- " + l.getClassroom().toString());
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

        // printForDebug("CLASSROOMOCCUPIED " + l1.toString() + " " + l2.toString(), "white", "black");

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
        // printForDebug("UBIQUITY: " + l1.toString() + " ** " + l2.toString(), "red", "white");
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

    
    reactor.createRule("overlapTimeSlot2", -2, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        var getCurriculumL1 = l1.getDiscipline().getCurriculum();
        var getCurriculumL2 = l2.getDiscipline().getCurriculum();
        return l1 != l2 &&
            l1.getDiscipline().getCourse() == l2.getDiscipline().getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() <= l2.getEndLesson() && l1.getEndLesson() >= l2.getStartLesson()) &&
            getCurriculumL1 != undefined && getCurriculumL2 == undefined ;

    },
    function (l1, l2) {

        // printForDebug("OVERLAPTIMESLOT2 " + l1.getDiscipline().getName() + " " + l2.getDiscipline().getName(), "black", "red");
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
     * RULE: Overlap curriculum that has common curriculum
     */
    reactor.createRule("overlapTimeSlot3", -3, { l1: Lesson, l2: Lesson },
    function (l1, l2) {
        var hasCommonCurriculum = l1.getDiscipline().getExistCurriculum(l2.getDiscipline().getCurriculum());
        return l1 != l2 &&
            l1.getDiscipline().getCourse() == l2.getDiscipline().getCourse() &&
            l1.getDay() == l2.getDay() &&
            (l1.getStartLesson() <= l2.getEndLesson() && l1.getEndLesson() >= l2.getStartLesson()) && hasCommonCurriculum;

    },
    function (l1, l2) {

        // printForDebug("OVERLAPTIMESLOT3 " + l1.getDiscipline().getName() + " " + l2.getDiscipline().getName(), "red", "black");
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

// reactor.createRule("refactorLesson", -2, { l1: Lesson },
//     function (l1) {
//         // var getCurriculumL1 = l1.getDiscipline().getCurriculum();
        
//         // var slotLesson1 = l1.getStartLesson() + l1.getDurationLesson();
        
//         // return getCurriculumL1 == undefined && 
//         //     l1.getDiscipline().getObligatory()==false  &&
//         //     slotLesson1 >= END_LESSONS;
//         var res = countHours(l1.getDiscipline().getCourse().getId(), l1.getDay())
//         return res >= 10 && l1.getEndLesson() > END_LESSONS;

//     },
//     function (l1) {

//         // printForDebug("refactorLesson " + l1.getDiscipline().getName(), "red", "yellow");
       
//         // var slotLesson1 = l1.getStartLesson() + l1.getDurationLesson();
//         var dL = l1.getDurationLesson();
//         l1.setStartLesson(START_LESSONS);
//         l1.setEndLesson(START_LESSONS + dL);
        

//     }); 

/**
 * Avoid that the same lesson is taught in the same day
 */
reactor.createRule("NOSameLessonSameDay", -1, { l1: Lesson, l2: Lesson },
    function (l1, l2) {

        return l1 != l2 &&
            l1.getDiscipline().getName() == l2.getDiscipline().getName() && l1.getDay() == l2.getDay();
    },
    function (l1, l2) {

        // printForDebug("NOSameLessonSameDay " + l1.toString() + " " + l2.toString(), "white", "pink");
        // var actualDayToAvoid = l2.getDay();
        // l1.setDay(generateDayByExcludingOne(actualDayToAvoid));
        l2.setNewDay(l1.getDay(), 1);
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
        // printForDebug("AVOIDLESSON " + l.getDiscipline().getName() + " " + l.getDay(), "white", "blue");

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
        // printForDebug("consecutiveLessons " + l.getDiscipline().getName() + " " + JSON.stringify(l.getDiscipline().getPreference()), "black", "pink");
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
        // printForDebug("consecutiveLessons " + l.getDiscipline().getName() + " " + JSON.stringify(l.getDiscipline().getPreference()), "black", "pink");
        if (l.getDurationLesson() == 2 && l.getDiscipline().getWeeksHours() == 6) { l.setDay("Wednesday"); }
        else { l.setDay("Thursday"); }
        // l1.setDay("Thursday");
        assert(timetable);


    });

/**
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
        // printForDebug("SETPERIODOFDAY_AM " + l.getDiscipline().getName() + " " + l.getDiscipline().getProfessor()[0].toString(), "white", "red");

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
        // printForDebug("SETPERIODOFDAY_PM " + l.getDiscipline().getName() + " " + l.getDiscipline().getProfessor()[0].toString(), "white", "green");
        var dL = l.getDurationLesson();
        l.setStartLesson(13);
        l.setEndLesson(13 + dL);
        // assert(timetable);
    });



/**
* RULE: Professor set a classroom preference with blackboard  
*/
reactor.createRule("checkClassroomBlackboard", -1, { l: Lesson },
    function (l) {
        return l.getClassroom().getBlackboard() != l.getDiscipline().getBlackboard() &&
                l.getDiscipline().checkExistPreference("blackboard");
    },
    function (l) {

        var compatibilityRooms = checkBlackboardClassroom(l.getDiscipline().getBlackboard());  
        var newClassRoom = compatibilityRooms[Math.floor(Math.random() * compatibilityRooms.length)];
        l.setClassroom(newClassRoom);
        assert(timetable);
    });





  

    /**
 * Rule for the end lesson over 19 
 */

reactor.createRule("maxLessonEnd", -2, { l: Lesson },
function (l) {
    var slotLesson = l.getStartLesson() + l.getDurationLesson();
    return slotLesson >= END_LESSONS;
},
function (l) {
    var dL = l.getDurationLesson();
    // printForDebug(l, "blue", "white");
    // l.getStartLesson()
    l.setDay(generateDayByExcludingOne(l.getDay()));
    l.setStartLesson(START_LESSONS);
    l.setEndLesson(START_LESSONS + dL);
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
            l1.getEndLesson() == l2.getStartLesson() &&
            l1.getDiscipline().getCurriculum() == undefined && l2.getDiscipline().getCurriculum() == undefined &&
            l1.getDiscipline().getObligatory() && l2.getDiscipline().getObligatory()) {
            count = countHoursBetween(l2.getDiscipline().getCourse(), l2.getDay(), l1.getStartLesson(), l2.getEndLesson());
        }
        return count > 5;

    },
    function (l1, l2) {
        // console.log("COMMON " + l1.getDiscipline().getName() + " " + l2.getDiscipline().getName());
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




