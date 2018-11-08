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

    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        timeFormat: 'H(:mm)', // uppercase H for 24-hour clock
        weekends: false,
        minTime: "08:30:00",
        maxTime: "20:00:00",
        slotLabelFormat: "HH:mm",
        allDaySlot: false,
        events: events,
        eventClick: function (calEvent, jsEvent, view) {
            alertModal(calEvent);
        },
    });

    queryClassrooms(classrooms, (value) => classrooms = value);
    queryProfessors(professors, (value) => professors = value);
    queryCourses(courses, (value) => courses = value);

    var newSem = localStorage.getItem("semesterUpdate");
    if (newSem == undefined) {
        var sem = $("#semesterDisciplineDropDown").val(newSem);
        queryDisciplineAsync(sem).then(function (matters) {
            setDiscipline(matters);
        });
    } else {
        var sem = $("#semesterDisciplineDropDown").val(newSem);
        queryDisciplineAsync(newSem).then(function (matters) {
            setDiscipline(matters);
        });
    }


    // make query every time the value change
    $(".dropdownChoiceDiscipline").change(function () {

        var newTimetable = new TimetableArray();
        timetable = newTimetable;

        var sem = $("#semesterDisciplineDropDown").val();
        localStorage.setItem("semesterUpdate", sem);
        window.location.replace("/");

        // queryDisciplineAsync(sem).then(function (matters) {
        //     setDiscipline(matters);
        // });
    });

    $("#generateCalendar").click(function () {
        events.length = 0;
        startGenerationCalendar(REPETITION_RULES);
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
function startGenerationCalendar(v) {
    // show the spinner
    showSpinnerLoader();
    if (v > 0) {
        console.log(v);
        assert(timetable);
        reactor.run(Infinity, true, function () {
            return startGenerationCalendar(v - 1);
        });
    } else {
        console.log("END");
        // hide the spinner
        hideSpinnerLoader();
        for (var i = 0; i < timetable.tt.length; i++) {
            var start = timetable.tt[i].getStartLesson().toFixed(2);
            var arrayStart = start.split(".");
            var end = timetable.tt[i].getEndLesson().toFixed(2);
            var arrayEnd = end.split(".");
            var numDay = defineDayNumber(timetable.tt[i].getDay());
            var name=timetable.tt[i].getDiscipline().getName();
            var abb=timetable.tt[i].getDiscipline().getAbbreviation();
            var curriculum='['+timetable.tt[i].getDiscipline().getCurriculum()+'] - ';
            if(curriculum=='[undefined] - ') {
                curriculum=""
            };
            var profs=timetable.tt[i].getDiscipline().getAllProfessor();
            var obb=timetable.tt[i].getDiscipline().getObligatory();
            var className=timetable.tt[i].getClassroom().getName();
            var classAddress=timetable.tt[i].getClassroom().getAddress()
            var newEvent = {
                start: createDate(numDay, arrayStart[0], arrayStart[1]),
                end: createDate(numDay, arrayEnd[0], arrayEnd[1]),
                title: abb + ' - ' + curriculum + className,
                content: "<b>MATERIA:</b> " + name + "<br />" +
                    "<b>INIZIO:</b>  " + start + "<br />" +
                    "<b>FINE:</b> " + end + "<br />" +
                    "<b>CURRICULUM:</b> " + curriculum + "<br />" +
                    "<b>PROFESSORE:</b> " + profs + "<br />" +
                    "<b>OBBLIGATORIO:</b> " + obb + "<br /><br />" +                   
                    "<b>AULA:</b> " + className + "<br />" +
                    "<b>INDIRIZZO:</b> " + classAddress + "",
                category: timetable.tt[i].getDiscipline().getCourse() + " " + timetable.tt[i].getDiscipline().getYear() + " anno"
            }
            newEvent.color = colorCategory(newEvent.category);
            // console.log(newEvent);
            events.push(newEvent);

        }
        // calendar.init();
        $('#calendar').fullCalendar('addEventSource', events);
        $("#generateCalendar").prop("disabled", true);
    }
   

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
        var randomDay = days[Math.floor(Math.random() * days.length)];
        var subjectWeeksHours = disc[i].getWeeksHours();
        //var subjectWeeksHours = DURATION_LESSON;
        if (subjectWeeksHours < 4) {
            timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 4) {
            timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 5) {
            timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
            timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
        }
        if (subjectWeeksHours == 6) {

            if (disc[i].getSplitDuration(2)) {
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
            }
            else if (disc[i].getSplitDuration(3)) {

                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 3, randomClassroom));
            }
            else {
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 2, randomClassroom));
                timetable.tt.push(new Lesson(randomDay, disc[i], START_LESSONS, START_LESSONS + 4, randomClassroom));
            }

        }

    }
}