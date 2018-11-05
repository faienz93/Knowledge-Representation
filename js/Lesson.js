
/**
 * ===========================================================================
 * File: Lesson.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Lesson Class. It contains the main information about a new Lesson. 
 * Every Information that is used for rule and concerns with discipline is take by field
 * Discipline
 * ===========================================================================
 */
function Lesson(day, discipline, startLesson, endLesson, classroom) {
    this.day = day;
    this.discipline = discipline;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;


    /**
     * Return the Day
     */
    this.getDay = function () {
        return this.day;
    }

    /**
     * Return the Discipline
     */
    this.getDiscipline = function () {
        return this.discipline;
    }

    /**
     * Return START LESSON
     */
    this.getStartLesson = function () {
        return this.startLesson;
    }

    /**
     * Return END LESSON
     */
    this.getEndLesson = function () {
        return this.endLesson;
    }

    /**
     * Return the duration Lesson: END LESSON - START LESSON
     */
    this.getDurationLesson = function () {
        var different = this.endLesson - this.startLesson;
        return Math.round(different * 100) / 100;
    }

    /**
     * Return Classroom
     */
    this.getClassroom = function () {
        return this.classroom;
    }


    /**
     * Set the classrooms
     */
    this.setClassroom = function (aula) {
        this.classroom = aula;
    }
  
    /**
     * Set the duration of Lessons
     */
    this.setDurationLesson = function (dur) {
        this.endLesson = this.startLesson + dur;
    }

    /**
     * Set Day
     */
    this.setDay = function (d) {
        this.day = d;
    }

    /**
     * Set a new day based on String passend as the first param and the secod param 
     */
    this.setNewDay = function (dString, dNumber) {
        // i.e Monday return 1
        var dNum = defineDayNumber(dString);

        // i.e 5 return Friday
        var dStr = defineDayString(dNum + dNumber);
        this.day = dStr;
    }

    /**
     * Set Start Lesson
     */
    this.setStartLesson = function (sl) {
        this.startLesson = sl;
    }

    /**
     * Set End Lesson
     */
    this.setEndLesson = function (el) {
        this.endLesson = el;
    }

    /**
     * Set Classroom
     */
    this.setClassroom = function (cl) {
        this.classroom = cl;
    }

    /**
     * Return the printing of main information
     */
    this.toString = function () {
        return this.day + " " + this.discipline.getName() + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;

    }

    /**
     * Return the printing of main Information in JSON format
     */
    this.toStringJSON = function () {
        var d = JSON.stringify({ discipline }, null, " ");
        return this.day + " " + d + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;

    }
}