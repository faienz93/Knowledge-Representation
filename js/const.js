/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * Desc: This file contains global variable
 * ===========================================================================
 */

function TimetableArray() {
    this.tt = [];
}

var timetable = new TimetableArray();

// Rooms returned by query
var classrooms = undefined;

// Professors returned by query
var professors = undefined;

// Courses returned by query
var courses = undefined;

// start lessons
var START_LESSONS = 8.30

var DURATION_LESSON = 6;

// end lessons
var END_LESSONS = 19;

// Global calendar
var calendar;

// Momentjs calendar
moment.locale('en');
var now = moment();

// Events of calendar
var events = [];

// var subject = [];

var classroom = [];

// Days of week
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

















