/*
 * ===========================================================================
 * File: InitCalendar.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * Desc: This file is used from index.html and does the followinf operation:
 * - create the query for retrieve the element based on selection of dropdown
 * - when dropdown change retrieve again the element
 * - start the rule-reactor and print the calendar
 * ===========================================================================
 */
$(document).ready(function () {

    queryClassrooms(classrooms, (value) => classrooms = value);
    queryProfessors(professors, (value) => professors = value);
    queryCourses(courses, (value) => courses = value);

    var sem = $("#semesterDisciplineDropDown").val();
    queryDisciplineAsync(sem).then(function (matters) {
        setDiscipline(matters);
    });

    // make query every time the value change
    $(".dropdownChoiceDiscipline").change(function () {
        var newTimetable = new TimetableArray();
        timetable = newTimetable;
        var sem = $("#semesterDisciplineDropDown").val();
        queryDisciplineAsync(sem).then(function (matters) {
            setDiscipline(matters);
        });
    });

    $("#generateCalendar").click(function () {
        events.length = 0;
        calendar.init();
        startGenerationCalendar();
    });

    $("#ciao").click(function () {
        alert("ffsijfiosd");
        console.log(timetable);
        for (var i = 0; i < timetable.tt.length; i++) {
            var start = timetable.tt[i].getStartLesson().toFixed(2);
            var arrayStart = start.split(".");
            var end = timetable.tt[i].getEndLesson().toFixed(2);
            var arrayEnd = end.split(".");
            var numDay = defineDayNumber(timetable.tt[i].getDay());
            var newEvent = {
                start: now.startOf('week').add(numDay, 'days').add(arrayStart[0], 'h').add(arrayStart[1], 'm').format('X'),
                end: now.startOf('week').add(numDay, 'days').add(arrayEnd[0], 'h').add(arrayEnd[1], 'm').format('X'),
                title: timetable.tt[i].getDiscipline().getName() + ' - ' + timetable.tt[i].getClassroom().getName(),
                category: timetable.tt[i].getDiscipline().getCourse() + " " + timetable.tt[i].getDiscipline().getYear()
            }
            events.push(newEvent);           
        }
        calendar.init();
    });


});

/**
 * Return the query with Promise that has different param:
 * - course,
 * - year,
 * - semester
 * @method queryDiscipline
 */
function queryDisciplineAsync(sem) {
    return queryDiscipline(sem);
}


/**
 * This method start the generation of calendar called assert(timetable)
 * For this start the rollspinner and at the end create a new Calendar
 * @method startGenerationCalendar
 */
function startGenerationCalendar() {
   // $("#loader").css("display", "block");
    assert(timetable);
    reactor.run(Infinity, true, function () {
        console.log("END");
        $("#loader").css("display", "none");
        // var output = JSON.stringify({ timetable }, null, " ");
        // console.log(output);
       
        for (var i = 0; i < timetable.tt.length; i++) {
            var start = timetable.tt[i].getStartLesson().toFixed(2);
            var arrayStart = start.split(".");
            var end = timetable.tt[i].getEndLesson().toFixed(2);
            var arrayEnd = end.split(".");
            var numDay = defineDayNumber(timetable.tt[i].getDay());
            var newEvent = {
                start: now.startOf('week').add(numDay, 'days').add(arrayStart[0], 'h').add(arrayStart[1], 'm').format('X'),
                end: now.startOf('week').add(numDay, 'days').add(arrayEnd[0], 'h').add(arrayEnd[1], 'm').format('X'),
                title: timetable.tt[i].getDiscipline().getAbbreviation() + ' - ' + timetable.tt[i].getClassroom().getName(),
                content: "MATERIA: " + timetable.tt[i].getDiscipline().getName() + "<br>" + 
                    "PROFESSORE: " + timetable.tt[i].getDiscipline().getAllProfessor() + "<br>" + 
                    "CORSO:: " + timetable.tt[i].getDiscipline().getCourse() +"<br>" + "<br>" +
                    "AULA:" + timetable.tt[i].getClassroom(),
                category: timetable.tt[i].getDiscipline().getCourse() + " " + timetable.tt[i].getDiscipline().getYear() + " anno"
            }
            events.push(newEvent);           
        }
        calendar.init();

        
        
    });

}

/**
 * This method set the discipline that returns after query. 
 * In this situation the timetable array has filled with the subjects
 * @method setDiscipline
 */
function setDiscipline(disc) {
    for (var i = 0; i < disc.length; i++) {
        var prof = disc[i].getProfessor();
        // Set Professors
        for (var index = 0; index < prof.length; index++) {
            prof[index] = professors.find(o => o.id === prof[index]);
        }
        // SET Course
        disc[i].setCourse(courses.find(o => o.id === disc[i].getCourse()));

        // Set Preference
        if (disc[i].checkExistPreference("splitdurationlessons6h") == false) {
            disc[i].splitDurationLessons6h(3);
        }

    }

    // for every query reset the timetable.length has resize
    timetable.tt.length = 0

    for (var i = 0; i < disc.length; i++) {

        var randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
        // var randomDay = days[Math.floor(Math.random() * days.length)];
        var subjectWeeksHours = disc[i].getWeeksHours();
        // var subjectWeeksHours = DURATION_LESSON;
        if (subjectWeeksHours < 4) {
            timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 4) {
            timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 5) {
            timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
            timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 6) {

            if (disc[i].getSplitDuration(2)) {
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            }
            else if (disc[i].getSplitDuration(3)) {

                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
            }
            else {
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson("Monday", disc[i], START_LESSONS, START_LESSONS + 4, randomClassroom));
            }

        }

    }
}