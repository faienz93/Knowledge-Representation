/**
 * ===========================================================================
 * File: Classroom.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a CLassroom Class
 * ===========================================================================
 */
function Classroom(id, name, address, capacity, wifi, wired) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.wifi = wifi;
    this.wired = wired;

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
     * Return Address
     */
    this.getAddress = function () {
        return this.address;
    }

    /**
     * Return Capacity
     */
    this.getCapacity = function () {
        return this.capacity;
    }

    /**
     * Return wifii
     */
    this.getWifi = function () {
        return this.wifi;
    }

    /**
     * Return Wired
     */
    this.getWired = function () {
        return this.wired;
    }

    /**
     * Return the main information of Classroom
     */
    this.toString = function () {
        return this.id + " " + this.name + " " + this.address + " " + this.capacity;
    }
}