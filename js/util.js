/**
 * ===========================================================================
 * File: util.js 
 * Author: Antonio Faienza
 * This file is create a function util 
 * ===========================================================================
 */


/**
 * Convert day of week into integer
 * @param {integer} d - number of day 
 */
function defineDayNumber(d) {
    var day = 0;
    if (d == 'Monday') {
        day = 1;
    } else if (d == 'Tuesday') {
        day = 2;
    } else if (d == 'Wednesday') {
        day = 3;
    } else if (d == 'Thursday') {
        day = 4;
    } else if (d == 'Friday') {
        day = 5;
    }

    return day;
}

/**
 * Convert day of week into String
 * @param {String} d - day of week
 */
function defineDayString(d) {
    var day = 'Monday';
    if (d == 1) {
        day = 'Monday';
    } else if (d == 2) {
        day = 'Tuesday';
    } else if (d == 3) {
        day = 'Wednesday';
    } else if (d == 4) {
        day = 'Thursday';
    } else if (d == 5) {
        day = 'Friday';
    }

    return day;
}

/**
 * Generate Random Day from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateDay(toRemove = undefined) {
    var giorniTemp = giorni.slice();

    if (toRemove != null) {
        var index = giorniTemp.indexOf(toRemove);
        if (index > -1) {
            giorniTemp.splice(index, 1);
        }
    }
    var randomDay = giorniTemp[Math.floor(Math.random() * giorniTemp.length)];
    //alert(randomDay);
    return randomDay;
}

/**
 * Generate Random Classroom from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateClassroom(toRemove = undefined) {
    var auleTemp = aule.slice();

    if (toRemove != null) {
        var index = auleTemp.indexOf(toRemove);
        if (index > -1) {
            auleTemp.splice(index, 1);
        }
    }

    var rClass = auleTemp[Math.floor(Math.random() * auleTemp.length)];
    return rClass;
}

/**
 * Return random nnumber between two value
 * @param {Integer} min 
 * @param {Integer} max 
 */
function randomIntFromInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Function for print somethings
 * @param {Object} toPrint - Object to print i.e String/Integer/array etc.
 */
function printForDebug(toPrint, color = "black", background = "yellow") {
    console.log("%c ==========================================", "color:"+color+"; background:"+background);
    console.log("%c"+toPrint, "color:"+color+"; background:"+background);
    console.log("%c ==========================================","color:"+color+"; background:"+background)
}