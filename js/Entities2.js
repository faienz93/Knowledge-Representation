// define the business object model consisting of
// Day, Timetable, Professor, Discipline. 

function TimetableArray() {
    this.tt = [];
}

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



    // this.generateTimeSlot = function () {
    //     var orari = []
    //     for (var i = START_LESSONS; i < END_LESSONS; i++) {
    //         orari.push(new Date(null, null, null, i).getHours());
    //     }


    //     var rHour = orari[Math.floor(Math.random() * orari.length)];
    //     // var rDurate = 2 + Math.round(Math.random());
    //     // timetable.tt.push(new Lesson(rDay, nomiMaterie[i], rHour, rHour + rDurate, rClass));
    //     return rHour;

    // }

    this.toString = function () {
        this.classroom = classroom;
        var printO = this.day + " " + this.discipline + " " + this.startLesson + " " + this.endLesson + " " + this.classroom;
        return JSON.stringify(printO);
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
    this.curriculum = null;
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
    

    this.getName = function () {
        return this.name;
    };

    this.addTeacher = function (t) {
        teacher.push(t);
    }

    this.getTeacher = function () {
        return teacher;
    }

    this.getTeacherJSON = function () {
        return JSON.stringify({ teacher }, null, " ");
    }

    this.setCurriculum = function (c) {
        this.curriculum=c;
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



function Curriculum(abbreviation, name, course) {
    this.abbreviation = abbreviation;
    this.name = name;
    this.course = course;
    var discipline = [];

    this.getAbbreviation = function () {
        return this.abbreviation;
    }

    this.getName = function () {
        return this.name;
    }

    this.toString = function () {
        return "CURRICULUM " + this.abbreviation + " " + this.name;
    }

    this.addDiscipline = function (d) {
        d.setCurriculum(this.abbreviation);
        discipline.push(d);
    }

    this.getDiscipline = function () {
        return discipline;
    }

    this.getDisciplineJSON = function () {
        return JSON.stringify({ discipline }, null, " ");
    }

    this.getCourse = function () {
        return this.course;
    }
}


// https://developer.mozilla.org/it/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#Example
function Course(id, name) {
    this.id = id;
    this.name = name;
    var curriculum = [];
    var discipline = [];

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }

    this.addCurriculum = function (abbreviation, name) {
        curriculum.push(new Curriculum(abbreviation, name, this));
    }

    this.addDiscipline = function (d) {
        discipline.push(d);
    }

    
    this.addDisciplineToCurriculum = function (curr, disc) {
        var obj = curriculum.find(o => o.abbreviation == curr);
        obj.addDiscipline(disc);
    }

    this.getDisciplineCurriculum = function (curr, disc) {
        var temp = [];
        for(var i = 0; i < curriculum.length; i++){
            temp.push(curriculum[i].getDiscipline());
        }
        return temp;
    }

    this.getAllDisciplineCourse = function (curr, disc) {
        var temp = [];
        for(var i = 0; i < curriculum.length; i++){
            temp.push(curriculum[i].getDiscipline());
        }
        for(var i = 0; i < discipline.length; i++){
            temp.push(discipline[i]);
        }
        return temp;
    }

    this.getCurriculum = function (sigle) {
        var obj = curriculum.find(o => o.abbreviation === sigle);

        if (obj != undefined) {
            return obj;
        } else {
            return "NON_DISPONIBILE";
        }
    }

    // this.getCurriculumByName = function (name) {
    //     var obj = curriculum.find(o => o.name === name);

    //     if (obj != undefined) {
    //         return obj;
    //     } else {
    //         return "NON_DISPONIBILE";
    //     }
    // }

    this.showAllCurriculum = function () {
        for (var i = 0; i < curriculum.length; i++) {
            printForDebug(this.id + " " + this.name + " " + curriculum[i].toString(), "white", "red");
        }
    }

    this.getAllCurriculum = function () {
        return curriculum;
    }

    this.getAllCurriculumJSON = function () {
        return JSON.stringify({ curriculum }, null, " ");
    }

    this.getDiscipline = function () {
        return discipline;
    }

    this.getDisciplineJSON = function () {
        return JSON.stringify({ discipline }, null, " ");
    }

    this.toString = function (curr = undefined) {
        if (curr == undefined) {
            return this.id + " " + this.name;
        }
        else { 
            var cur = this.getCurriculum(curr);
            if(cur != "NON_DISPONIBILE"){
                return this.id + " " + this.name + " " + cur.toString(); 
            }else {
                return this.id + " " + this.name;
            }
            
        }
    }
}









