$(document).ready(function () {
    
    queryClassrooms(classrooms, (value) => classrooms = value);
    queryProfessors(professors, (value) => professors = value);
    queryCourses(courses, (value) => courses = value);
    queryDiscipline(returnDiscipline);

    

    $("#generateCalendar").click(function () {   
        events.splice(0,events.length);
        calendar.init();
        startGenerationCalendar();        
    });
});

function returnDiscipline(disc) {
    for (var i = 0; i < disc.length; i++) {
        var prof = disc[i].getProfessor();
        // Set Professors
        for (var index = 0; index < prof.length; index++) {
            prof[index] = professors.find(o => o.id === prof[index]);
        }
        // SET Course
        disc[i].setCourse(courses.find(o => o.id === disc[i].getCourse()));
    }


    for (var i = 0; i < disc.length; i++) {
        if (disc[i].getYear() == "1" && disc[i].getSemester() == "1") {
            // console.log(disciplines[i]);
            // fill array for calendar
            subject.push(disc[i]);
        }
    }

    //Preferenze di default 
    for (var i = 0; i < subject.length; i++) {
        subject[i].splitDurationLessons6h(3);
    }

    console.log(subject);

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

function startGenerationCalendar() {

    
    

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
                title: timetable.tt[i].getDiscipline().getAbbreviation() + ' - ' + timetable.tt[i].getClassroom().getName(),
                content: "AULA:" + timetable.tt[i].getClassroom() + "<br>" +
                    "CORSO: " + timetable.tt[i].getDiscipline().getCourse() + "<br>" + // TODO gestire i professori multipli
                    "PROFESSORE " + timetable.tt[i].getDiscipline().getAllProfessor(),//'Hello World! <br> <p>Foo Bar</p>',
                category: timetable.tt[i].getDiscipline().getCourse()
            }
            events.push(newEvent);
        }
        calendar.init();
    });
    

}


