
    function Lesson(day, discipline, startLesson, endLesson, classroom) {
    this.day = day;
    this.discipline = discipline;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;  

   

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


    this.setClassroom = function (aula) {
        this.classroom = aula;
    }
    

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
        return this.day + " " + this.discipline.getName() + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;

    }

    this.toStringJSON = function () {
        var d = JSON.stringify({ discipline }, null, " ");
        return this.day + " " + d + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;

    }
}