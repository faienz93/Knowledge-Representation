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
function Discipline(id, name, semester, obligatory, totalHours, weeksHours, cfu, year) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.teacher = null;

    this.getName = function () {
        return this.name;
    };

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


function Course(id, name) {
    this.id = id;
    this.name = name;

    this.discipline = [];

    this.getDiscipline = function () {
        return this.discipline;
    };
}