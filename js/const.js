/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This file contains global variable
 * ===========================================================================
 */

// start lessons
var START_LESSONS = 9;

var DURATION_LESSON = 2;

// end lessons
var END_LESSONS = 18;

// Global calendar
var calendar;

// Momentjs calendar
moment.locale('en');
var now = moment();

// Events of calendar
var events = [];

// var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2', 'Aula Ercolani 3', 'Lab Ercolani', 'Ranzani', 'Vitali'];
var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2'];


var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MSC', 'MAT', 'COM', 'UUX'];
// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MAT'];
var nomiMaterie = ['RDC', 'SM', 'IOT'];

// var nomiMaterieInfoMan = ['DI', 'EA', 'AM', 'PI'];
var nomiMaterieInfoMan = ['DI', 'EA', 'AM'];

var nomiMaterieInfoTriennale = ['P', 'O', 'CN'];
