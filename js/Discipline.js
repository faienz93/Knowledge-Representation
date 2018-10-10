/**
 * ===========================================================================
 * File: Discipline.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Discipline Class. It contains the main information of Discipline. i.e obligatory or not
 * and some information optional that can be added with specifi method as addProfessor
 * ===========================================================================
 */
function Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year, numStudents) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.numStudents = numStudents;
    var professor = [];
    this.course = null;
    var curriculum = [];


    /**
     * Return a Name
     */
    this.getName = function () {
        return this.name;
    };

    /**
     * Return the obligatory of Course
     */
    this.getObligatory = function () {
        return this.obligatory;
    }

    /**
     * Set a new Professor insiede an array becaure for an discipline can
     * be taught by multiple professor
     */
    this.setProfessor = function (t) {
        professor.push(t);
    }

    /**
     * Return an Array of Professor of this discipline
     */
    this.getProfessor = function () {
        return professor;
    }

    /**
     * Return an Array of Professor of this discipline in JSON Format
     */
    this.getProfessorJSON = function () {
        return JSON.stringify({ professor }, null, " ");
    }

    /**
     * Set a new Curriculum insiede an array becaure for an discipline can
     * be belong by multiple Curriculum
     */
    this.addCurriculum = function (cur) {
        curriculum.push(cur);
    }

    /**
    * Return an Array of Curriculum of this discipline
    */
    this.getCurriculum = function () {
        return curriculum;
    }

    /**
    * Return an Array of Curriculum of this discipline in JSON Format
    */
    this.getCurriculumJSON = function () {
        return JSON.stringify({ curriculum }, null, " ");
    }

    // this.getExistCurriculum = function (sigle) {
    //     var obj = this.curriculum.find(o => o.id === sigle);
    //     if (obj != undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    /**
     * Set a new Course
     */
    this.addCourse = function (c) {
        this.course = c;
    }

    /**
     * Return a Course of Discipline
     */
    this.getCourse = function () {
        return this.course;
    }

    /**
     * Return the Num of Students
     */
    this.getNumStudent = function () {
        return this.numStudents;
    }

    /**
     * Return the main information of discipline
     */
    this.toString = function () {
        return this.name + " " + professor + " " + course;
    }

    /**
     * Return the main information of discipline in JSON format
     */
    this.toStringJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        return this.name + " " + t + " " + course + cur;
    }





}