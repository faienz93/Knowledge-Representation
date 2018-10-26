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
 * Function that spli the string into array and determinate the curriculum of discipline;
 * @param {String} str - string to split
 */
function splitCurriculum(str) {   
    if(str != "NO"){
        return str.split("");
    }
    
}

/**
 * Function that counts number of hours of a specific course in a specific day
 * 
 */
function countHours(course,day){
    var result=0;
     for(var i=0;i<timetable.tt.length;i++){        
        if(timetable.tt[i].getDiscipline().getCourse().getId() == course && 
        timetable.tt[i].getDay() == day){
           result+=timetable.tt[i].getDurationLesson();
               }       
}   
   return result;
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

/**
 * Compare method of input chosen by professor with the blackboard of classRoom
 * It return an array only with classroom that has more capacity respect the write method
 * @param {Integer} numSub - number of Students subscribed to Course
 */
function checkBlackboardClassroom(method) {
    var result = [];
    for (var i = 0; i < classrooms.length; i++) {
        if (classrooms[i].getBlackboard() == method) {
            result.push(classrooms[i]);        }
    }
    return result;
}
/**
 * Function that counts number of hours of a specific course in a specific day until a specific hour
 * mod
 */
function countHoursBetween(course, day, startHour, endHour) {
    var result = 0;
    for (var i = 0; i < timetable.tt.length; i++) {
        if (timetable.tt[i].getDiscipline().getCourse() == course
            && timetable.tt[i].getDay() == day
            && startHour <= timetable.tt[i].getStartLesson()
            && timetable.tt[i].getStartLesson() <= endHour
        ) {
            result += timetable.tt[i].getDurationLesson();
        }
    }
    return result;
}
    /**
     * Return the professor by Id
     */
    function getProfessorById (idProf) {
        var result;
        $( document ).ajaxComplete(function() {
            
            for (var i=0;i<professors.length;i++){                
                if(professors[i].getId()==idProf){                    
                    result = professors[i];                    
                }            
            };            
            }
          );                 
        return result;
        
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



