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
    this.getId = function(){
        return this.id;
    }

    /**
     * Return the Name and Surname
     */
    this.getCompleteName = function () {
        return this.name + " " + this.surname;
    }

    
    /**
     * Check if exist the same professor from array based on ID 
     * @param {array} arr array of other professor
     * @param {String} idP Id Professor
     * REF:https://stackoverflow.com/a/8217584/4700162
     */
    this.checkExistProfessor = function(arr,idP) {
        if (arr.some(e => e.id === idP)) {
            return true;
        }else {
            return false;
        }
    }
}