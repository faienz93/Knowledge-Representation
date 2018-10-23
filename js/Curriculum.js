/**
 * ===========================================================================
 * File: Curriculum.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Curriculum Class
 * ===========================================================================
 */
function Curriculum(id, name) {
    this.id = id;
    this.name = name;

    /**
     * Return Id
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
     * Return the complete information of Curriculum
     */
    this.toString = function() {
        return this.id + " " + this.name;
    }
}