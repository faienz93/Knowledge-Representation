$(document).ready(function () {
    
    queryClassrooms(classrooms, (value) => classrooms = value);
    queryProfessors(professors, (value) => professors = value);
    queryCourses(courses, (value) => courses = value);
    
    // define the association between discipline and course
    queryDisciplineAsync().then(function(matters){
        for (var i = 0; i < matters.length; i++) {
            var prof = matters[i].getProfessor();
            // Set Professors
            for (var index = 0; index < prof.length; index++) {
                prof[index] = professors.find(o => o.id === prof[index]);
            }
            // SET Course
            matters[i].setCourse(courses.find(o => o.id === matters[i].getCourse()));
    
            // Set preference Default
            matters[i].splitDurationLessons6h(3);
        } 
        
        disciplines = matters;
        
    });
    

    

    $("#generateCalendar").click(function () {   
        events.splice(0,events.length);
        calendar.init();
        setDiscipline();
        startGenerationCalendar();        
    });
});

/**
 * Return the promise definde inside query queryDiscipline
 */
function queryDisciplineAsync(){
    return queryDiscipline();
}

/**
 * Define the discipline to want calculate calendar
 */
function setDiscipline(){

        subject.splice(0,subject.length);
        var c = $("#courseDisciplineDropDown").val();
        var y = $("#yearDisciplineDropDown").val();
        var sem = $("#semesterDisciplineDropDown").val();
        console.log(c);
        console.log(y);
        console.log(sem);

    for (var i = 0; i < disciplines.length; i++) {
        // console.log(disciplines[i].getCourse().getName())

        if (disciplines[i].getYear() == y && disciplines[i].getSemester() == sem && disciplines[i].getCourse().getName() == c) {
            // console.log(disciplines[i]);
            // fill array for calendar
            subject.push(disciplines[i]);
        }
        if (disciplines[i].getYear() == y && disciplines[i].getSemester() == sem && c == "ALL") {
            // console.log(disciplines[i]);
            // fill array for calendar
            subject.push(disciplines[i]);
        }
    }

    //Preferenze di default 
    // for (var i = 0; i < subject.length; i++) {
    //     subject[i].splitDurationLessons6h(3);
    // }

    // console.log(subject);

    for (var i = 0; i < subject.length; i++) {

        var randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
        // var randomDay = days[Math.floor(Math.random() * days.length)];
        var subjectWeeksHours = subject[i].getWeeksHours();
        // var subjectWeeksHours = DURATION_LESSON;
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
}

/**
 * Based on the rule, start the assertion
 */
function startGenerationCalendar() {

    assert(timetable);
    reactor.run(Infinity, true, function () {
        console.log("END");
        // var output = JSON.stringify({ timetable }, null, " ");
        // console.log(output);

        for (var i = 0; i < timetable.tt.length; i++) {
            var numDay = defineDayNumber(timetable.tt[i].getDay());
            var newEvent = {
                start: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getStartLesson(), 'h').add(00, 'm').format('X'),
                end: now.startOf('week').add(numDay, 'days').add(timetable.tt[i].getEndLesson(), 'h').format('X'),
                title: timetable.tt[i].getDiscipline().getAbbreviation() + ' - ' + timetable.tt[i].getClassroom().getName(),
                content: "<strong>CORSO:</strong>: " + timetable.tt[i].getDiscipline().getCourse() + "<br>" + "<br>" +
                    "<strong>MATERIA:</strong> " + timetable.tt[i].getDiscipline().getName() + "<br>" +
                    "<strong>PROFESSORE:</strong> " + timetable.tt[i].getDiscipline().getAllProfessor() + "<br>" + "<br>" +
                    "<strong>AULA:</strong>" + timetable.tt[i].getClassroom(),
                category: timetable.tt[i].getDiscipline().getCourse()
            }
            events.push(newEvent);
        }
        calendar.init();
    });    

}



