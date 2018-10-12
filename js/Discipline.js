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
    var preference = []; 


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
     * **********************************************************************************************
     * ***************************************** PREFERENCE *****************************************
     * **********************************************************************************************
     */   
    

    /**
     * Set the preference of consecutive day as true
     */
    this.consecutiveDay = function (d){
        var consday = {"consecutiveDay": d}
        preference.push(consday);
    }

    /**
     * Set the preference that for this discipline an professor
     * want to avoid a specific day
     */
    this.avoidLessonDay = function(d){
        var avDay = { "avoidLessonDay": d};
        preference.push(avDay);        
    }

    /**
     * Check from the preference if exist a lesson day that is assigned 
     * to a day to avoid
     */
    this.checkIncompatibilyDay = function(v) {
        if(preference.some(e => e.avoidLessonDay === v)){
            return true;
        }else {
            return false;
        }
     }
     
     /**
      * Check from Preference exist a particular preference named by param i.e avoidLessonDay
      * REF: https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
      */
     this.checkExistPreference = function(key){
         for(var i = 0; i < preference.length; i++) {
             if(key in preference[i]) {
                 return true;
             }else {
                 return false;
             }
         }       
     }

    // /**
    //  * Find ALL Object value of array from Specific Key
    //  * REF: https://stackoverflow.com/a/46694321/4700162
    //  */
    // this.findValuePreference = function(keyy){       
    //     var obj = preference.find(o => o.keyy === key);        
    // }

    /**
     * Return the array of Preference
     */
    this.getPreference = function () {
        if (preference.length == 0) {
            return "ATTENZIONE: Nessuna preferenza impostata per " + this.name + " " + this.surname;
        } else {
            return preference;
        }
    }

    /**
     * **********************************************************************************************
     * ****************************************** TOSTRING ******************************************
     * **********************************************************************************************
     */

    /**
     * Return the main information of discipline
     */
    this.toString = function () {
        var p = JSON.stringify({ preference }, null, " ");
        return this.name + " " + professor + " " + course;
    }

    /**
     * Return the main information of discipline in JSON format
     */
    this.toStringJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        var p = JSON.stringify({ preference }, null, " ");
        return this.name + " " + t + " " + course + " " + cur + " " + p;
    }





}