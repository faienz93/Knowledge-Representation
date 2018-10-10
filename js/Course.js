/**
 * ===========================================================================
 * File: Course.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Course Class
 * ===========================================================================
 */
function Course(id, name) {
    this.id = id;
    this.name = name;

    /**
     * Return ID
     */
    this.getId = function () {
        return this.id;
    }

    /**
     * Return Name
     */
    this.getName = function () {
        return this.name;
    }


    /**
     * Return the printing af all information of Class
     */
    this.toString = function () {
        return this.id + " " + this.name;
    };
}