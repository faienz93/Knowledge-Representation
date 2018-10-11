/**
 * ===========================================================================
 * File: Professor.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Professor Class
 * ===========================================================================
 */

/**
 * Class Professor
 */
function Professor(name, surname, id, role) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.role = role;

    var preference = []; 

    /**
     * Return Name
     */
    this.getName = function () {
        return this.name;
    };

    /**
     * Return Surname
     */
    this.getSurname = function () {
        return this.surname;
    };

    /**
     * Return ID
     */
    this.getId = function () {
        return this.id;
    }

    /**
     * Return the Name and Surname
     */
    this.getCompleteName = function () {
        return this.name + " " + this.surname;
    }

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

    // this.beginsLessonFrom = function(d) {
    //     var cd = { "beginsLessonFrom": d };
    //     preference.push(cd);
    // }

    this.avoidLessonDay = function(d,s){
        var aDay = { "avoidLessonDay": d};
        var sub = { "discipline": s};
        preference.push(aDay);
        preference.push(sub);
    }


    /**
     * Check if exist the same professor from array based on ID 
     * @param {array} arr array of other professor
     * @param {String} idP Id Professor
     * REF:https://stackoverflow.com/a/8217584/4700162
     */
    this.checkExistProfessor = function (arr, idP) {
        if (arr.some(e => e.id === idP)) {
            return true;
        } else {
            return false;
        }
    }

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
     * Return the main information about the professor and preference
     */
    this.toString = function () {
        var p = JSON.stringify({ preference }, null, " ");
        return this.name + " " + this.surname + p;
    }

    
}