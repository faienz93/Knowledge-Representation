// id_discipline,disciplineName,semester,obligatory,totalHours,weeksHours,cfu,year,course,professor
function Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year, numStudents) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.numStudents = numStudents;
    var professor = [];
    var course = null;
    var curriculum = [];
    


    this.getName = function () {
        return this.name;
    };

    // professor
    this.setProfessor = function (t) {
        professor.push(t);
    }

    this.getProfessor = function () {
        return professor;
    }

    this.getProfessorJSON = function () {
        return JSON.stringify({ professor }, null, " ");
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

    // this.getExistCurriculum = function (sigle) {
    //     var obj = this.curriculum.find(o => o.id === sigle);
    //     if (obj != undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    // COURSE
    this.addCourse = function (c) {
        course = c;
    }

    this.getCourse = function () {
        return course;
    }

    this.getNumStudent = function () {
        return this.numStudents;
    }

    this.toString = function () {
        return this.name + " " + professor + " " + course;
    }

    this.toStringJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        return this.name + " " + t + " " + course + cur;
    }

    this.getObligatory = function () {
        return this.obligatory;
    }



}