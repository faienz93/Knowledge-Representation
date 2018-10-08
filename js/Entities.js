


// define the business object model consisting of
// Day, Timetable, Professor, Discipline. 

function TimetableArray() {
    this.tt = [];
}

// TODO add Teacher
function Lesson(day, discipline, startLesson, endLesson, classroom, course) {
    this.day = day;
    this.discipline = discipline;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;
    this.course = course;

    this.getDay = function () {
        return this.day;
    }

    this.getDiscipline = function () {
        return this.discipline;
    }

    this.getStartLesson = function () {
        return this.startLesson;
    }

    this.getEndLesson = function () {
        return this.endLesson;
    }

    this.getDurationLesson = function () {
        return this.endLesson - this.startLesson;
    }

    this.getClassroom = function () {
        return this.classroom;
    }

    this.setClassroom = function (aula) {
        this.classroom = aula;
    }

    this.getCourse = function () {
        return this.course;
    }

    


    this.setDurationLesson = function (dur) {
        this.endLesson = this.startLesson + dur;
    }

    this.setDay = function (d) {
        this.day = d;
    }

    this.setDay = function (dString, dNumber) {
        // i.e Monday return 1
        var dNum = defineDayNumber(dString);

        // i.e 5 return Friday
        var dStr = defineDayString(dNum + dNumber);
        this.day = dStr;
    }

    this.setStartLesson = function (sl) {
        this.startLesson = sl;
    }

    this.setEndLesson = function (el) {
        this.endLesson = el;
    }

    this.setClassroom = function (cl) {
        this.classroom = cl;
    }



    this.toString = function () {
         return this.day + " " + this.discipline + " " + this.startLesson + " " + this.endLesson + " " + this.classroom + " " + this.course ;
     
    }
}




// firstName,surName,id_professor,role
function Professor(firstName, surname, id, role) {
    this.firstName = firstName;
    this.surname = surname;
    this.id = id;
    this.role = role;

    this.nolessons = null;

    this.getFirstName = function () {
        return this.firstName;
    };
}

// id_discipline,disciplineName,semester,obligatory,totalHours,weeksHours,cfu,year,course,teacher
function Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    var teacher = [];
    var course = [];


    this.getName = function () {
        return this.name;
    };

    // TEACHER
    this.addTeacher = function (t) {
        teacher.push(t);
    }

    this.getTeacher = function () {
        return teacher;
    }

    this.getTeacherJSON = function () {
        return JSON.stringify({ teacher }, null, " ");
    }

    // COURSE
    this.addCourse = function (c) {
        course.push(c);
    }

    this.getCourse = function () {
        return course;
    }

    this.getCourseJSON = function () {
        return JSON.stringify({ course }, null, " ");
    }

    this.toString = function() {
        var t = JSON.stringify({ teacher }, null, " ");
        var c = JSON.stringify({ course }, null, " ");
        return this.name + " " + t  + " " + c;
    }

    

}

// id_room,className,address,capacity,wifi,wired
function Classroom(id, name, address, capacity, wifi, wired) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.wifi = wifi;
    this.wired = wired;
}


// https://developer.mozilla.org/it/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#Example
// function Course(id, name) {
//     this.id = id;
//     this.name = name;
// }

// Course.prototype.getId = function () {
//     return this.id;
// };

// Course.prototype.getName = function () {
//     return this.name;
// };

// Course.prototype.toString = function () {
//     return this.id + " " + this.name;
// };

// function Curriculum(id, name, sigle,curr) {
//     Course.call(this, id, name);
//     this.sigle = sigle;
//     this.curr = curr;

//     this.getSigle = function () {
//         return this.sigle;
//     }

//     this.getCurriculum = function () {
//         return this.curr;
//     }

   
// }

// Curriculum.prototype = Object.create(Course.prototype);
// Curriculum.prototype.constructor = Curriculum;



// Curriculum.prototype.toString = function () {
//     return this.id + " " + this.name + " " + this.sigle + " " + this.curr;
// };




function Course(id, name, sigle = null,curr = null) {
    this.id = id;
    this.name = name;
    this.sigle = sigle;
    this.curr = curr;

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }

    this.getSigle = function () {
        return this.sigle;
    }

    this.getCurriculum = function () {
        return this.curr;
    }

    this.toString = function () {
        if(this.sigle == null || this.curr == null) {
            return this.id + " " + this.name;
        }
        else {
            return this.id + " " + this.name + " " + this.sigle + " " + this.curr;
        }
        
    };

   
}
