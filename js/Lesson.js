// function Lesson(day, discipline, professor, startLesson, endLesson, classroom, course, curriculum = null, obligatory = null, numStudents) {
    function Lesson(day, discipline, professor, startLesson, endLesson, classroom, course, numStudents) {
    this.day = day;
    this.discipline = discipline;
    this.professor = professor;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;
    this.course = course;
    // this.curriculum = curriculum;
    // this.obligatory = obligatory;
    this.numStudents = numStudents;

    // this.getObligatory = function () {
    //     return this.obligatory;
    // }

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
        // console.log(this.classroom);
        return this.classroom;
    }

    this.getProfessor = function() {
        return professor;
    }

    this.getProfessorJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        return t;
    }

    this.setClassroom = function (aula) {
        this.classroom = aula;
    }

    this.getCourse = function () {
        return this.course;
    }

    // this.getCurriculum = function () {
    //     return this.curriculum;
    // }

    // this.getExistCurriculum = function (sigle) {
    //     var obj = this.curriculum.find(o => o.id === sigle);
    //     if (obj != undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    this.getNumStudent = function () {
        return this.numStudents;
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

    this.setClassroom = function (cl) {
        this.classroom = cl;
    }



    this.toString = function () {
        return this.day + " " + this.discipline + " " + this.startLesson + " " + this.endLesson + " " + this.classroom + " " + this.course;

    }
}