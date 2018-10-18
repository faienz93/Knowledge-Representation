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
function generateDayByExcludingOne(toRemove = undefined) {
    var daysTemp = days.slice();

    if (toRemove != null) {
        var index = daysTemp.indexOf(toRemove);
        if (index > -1) {
            daysTemp.splice(index, 1);
        }
    }
    var randomDay = daysTemp[Math.floor(Math.random() * daysTemp.length)];
    //alert(randomDay);
    return randomDay;
}


/**
 * Generate A concescutive Day from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateDayConsecutive(toRemove = undefined) {
    var daysTemp = days.slice();

    if (toRemove != null) {
        var index = daysTemp.indexOf(toRemove);
        if (index > -1) {
            daysTemp.splice(index, 1);
        }
    }

    // 


    //alert(randomDay);
    return daysTemp[0];
}

/**
 * Generate Random Classroom from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateClassroom(toRemove = undefined) {
    var classroomsTemp = classrooms.slice();

    if (toRemove != null) {
        var index = classroomsTemp.indexOf(toRemove);
        if (index > -1) {
            classroomsTemp.splice(index, 1);
        }
    }

    var rClass = classroomsTemp[Math.floor(Math.random() * classroomsTemp.length)];
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
 * Compare two array and check if has same value
 * @param {Array} ary1 
 * @param {Array} ary2 
 */
function compareArray(ary1, ary2) {
    return (ary1.join('') == ary2.join(''));
}

/**
 * Compare the number of Subscription of one course i.e IoT with the capacity of classRoom
 * It return an array only with classroom that has more capacity respect the number of Students
 * @param {Integer} numSub - number of Students subscribed to Course
 */
function checkCapacityClassroom(numSub) {
    var result = [];
    for (var i = 0; i < classrooms.length; i++) {
        if (classrooms[i].getCapacity() > numSub) {
            result.push(classrooms[i]);
        }
    }
    return result;
}

function updateEventCalendar(l) {
   
    var numDay = defineDayNumber(l.getDay());
    var prova = now.startOf('week').add(numDay, 'days').add(l.getStartLesson(), 'h').add(00, 'm').format('X');
    
    var findEvents = calendar.getEvents().find(o => o.start == prova);    
    if (findEvents != undefined) {
        calendar.getEvents().splice(findEvents, 1);
        // console.log("Lo ha trovato");
    } else {
        var numDay = defineDayNumber(l.getDay());
        var newEvent = {
            start: now.startOf('week').add(numDay, 'days').add(l.getStartLesson(), 'h').add(00, 'm').format('X'),
            end: now.startOf('week').add(numDay, 'days').add(l.getEndLesson(), 'h').format('X'),
            title: l.getDiscipline().getName(),
            content: "AULA:" + l.getClassroom() + "<br>" +
                "CORSO: " + l.getDiscipline().getCourse() + "<br>" + // TODO gestire i professori multipli
                "PROFESSORE " + l.getDiscipline().getAllProfessor(),//'Hello World! <br> <p>Foo Bar</p>',
            category: l.getDiscipline().getCourse()
        }
        calendar.addEvents(newEvent);
    }
    // console.log(events);
    // console.log(calendar);
    calendar.init()
}

function updateCalendar(calendar, e) {
    // var result = [];
    // for (let e of timetable.tt) 
    {

        var numDay = defineDayNumber(e.getDay());
        var newEvent = {
            start: now.startOf('week').add(numDay, 'days').add(e.getStartLesson(), 'h').add(00, 'm').format('X'),
            end: now.startOf('week').add(numDay, 'days').add(e.getEndLesson(), 'h').format('X'),
            title: e.getDiscipline().getName() + ' - ' + e.getClassroom().getName(),
            content: "AULA:" + e.getClassroom() + "<br>" +
                "CORSO: " + e.getDiscipline().getCourse() + "<br>" + // TODO gestire i professori multipli
                "PROFESSORE " + e.getDiscipline().getAllProfessor(),//'Hello World! <br> <p>Foo Bar</p>',
            category: e.getDiscipline().getCourse()
        }
        calendar.addEvents(newEvent);

        // result.push(newEvent);
    }
    // calendar.setEventCategoriesColors([{ category: "Personnal", color: "#AD1457" }]);
    calendar.init();


}
/**
 * Function for print somethings
 * @param {Object} toPrint - Object to print i.e String/Integer/array etc.
 */
function printForDebug(toPrint, color = "black", background = "yellow") {
    console.log("%c ==========================================", "color:" + color + "; background:" + background);
    console.log("%c" + toPrint, "color:" + color + "; background:" + background);
    console.log("%c ==========================================", "color:" + color + "; background:" + background)
}

/**
 * Function that counts number of hours of a specific course in a specific day
 * 
 */
function countHours(course, day) {
    var result = 0;
    // console.log(timetable.tt[0].getCourse().getId());
    for (var i = 0; i < timetable.tt.length; i++) {
        if (timetable.tt[i].getDiscipline().getCourse().getId() == course && timetable.tt[i].getDay() == day) {
            result += timetable.tt[i].getDurationLesson();
        }
    }
    return result;
}
/**
 * Function that return the day with the min hour for a specific course
 * 
 */
function minCountHours(course) {
    var hourForDay = [];
    for (var i = 0; i < days.length; i++) {
        hourForDay[i] = countHours(course, days[i]);
    }
    var minIndex = hourForDay.indexOf(Math.min(...hourForDay));
    var result = days[minIndex];
    return result;
}
/**
 * Function that return the day with the max hour for a specific course
 * 
 */
function maxCountHours(course) {
    var hourForDay = [];
    for (var i = 0; i < days.length; i++) {
        hourForDay[i] = countHours(course, days[i]);
    }
    var maxIndex = hourForDay.indexOf(Math.max(...hourForDay));
    var result = days[maxIndex];
    return result;
}

// function printPreferences(d){
//     console.log("=============INIZIO PREFERENZE=================");
//     var disciplineName="";
//     var disciplinePreference= "";
//     var preferenceKey=null;
//     for(var i=0;i<d.length;i++){
//         discipline=d[i].getDiscipline();
//         disciplineName= discipline.getName();
//     for(var j=0;j<d.length;j++){          
//         disciplinePreference = discipline.getPreference();
//         preferenceKey = Object.keys(disciplinePreference); 
//         if(disciplinePreference!=undefined){
//             console.log(disciplinePreference);
//        // console.log(disciplineName+" "+preferenceKey +" " + disciplinePreference[j].preferenceKey);
//         }
//     }
// }
// console.log("=============FINE PREFERENZE=================");
// }
