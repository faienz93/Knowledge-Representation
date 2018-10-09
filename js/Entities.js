


// define the business object model consisting of
// Day, Timetable, Professor, Discipline. 

function TimetableArray() {
    this.tt = [];
}

// TODO add Teacher
function Lesson(day, discipline, startLesson, endLesson, classroom, course, curriculum, obligatory,numStudents) {
    this.day = day;
    this.discipline = discipline;
    this.startLesson = startLesson;
    this.endLesson = endLesson;
    this.classroom = classroom;
    this.course = course;
    this.curriculum = curriculum;
    this.obligatory = obligatory;
    this.numStudents=numStudents;

    this.getObligatory = function () {
        return this.obligatory;
    }

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
    discipline
    this.getCourse = function () {
        return this.course;
    }

    this.getCurriculum = function () {
        return this.curriculum;
    }

    this.getExistCurriculum = function(sigle) {
        var obj = this.curriculum.find(o => o.id === sigle);
        if(obj != undefined) {
            return true;
        }else {
            return false;
        }
    } 
    
    this.getNumStudent = function(){
        return this.numStudents;
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
function Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year,numStudents) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.numStudents=numStudents;
    var teacher = [];
    this.course = null;
    var curriculum = [];
    


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

    // CURRICULUM
    this.addCurriculum = function (cur) {
        curriculum.push(cur);
    }

    this.getCurriculum = function () {
        return curriculum;
    }

    this.getCurriculumJSON = function () {
        return JSON.stringify({ curriculum }, null, " ");
    }

    

    // COURSE
    this.addCourse = function (c) {
        this.course = c;
    }

    this.getCourse = function () {
        return this.course;
    }

    this.getNumStudent = function(){
        return this.numStudents;
    }

    this.toString = function() {
        
        return this.name + " " + teacher  + " " + this.course;
    }

    this.toStringJSON = function() {
        var t = JSON.stringify({ teacher }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        return this.name + " " + t  + " " + this.course + cur; 
    }

    this.getObligatory =  function() {
        return this.obligatory;
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

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }


    this.getAddress = function () {
        return this.address;
    }
    this.getCapacity = function () {
        return this.capacity;
    }

    this.getWifi = function () {
        return this.wifi;
    }

    this.getWired = function () {
        return this.wired;
    }

    this.toString = function () {
        return this.id +  " " + this.name +  " " + this.address +  " " + this.capacity;
    }
}





function Course(id, name) {
    this.id = id;
    this.name = name;
    

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }

    

    this.toString = function () {
        return this.id + " " + this.name;        
    };   
}

function Curriculum(id, name) {
    this.id=id;
    this.name=name;
   

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }
}
