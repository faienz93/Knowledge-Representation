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
    var professor = [];
    this.course = null;
    var curriculum = [];
    this.numStudents = numStudents;


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



    // COURSE
    this.addCourse = function (c) {
        this.course = c;
    }

    this.getCourse = function () {
        return this.course;
    }

    this.getNumStudent = function () {
        return this.numStudents;
    }

    this.toString = function () {

        return this.name + " " + professor + " " + this.course;
    }

    this.toStringJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        return this.name + " " + t + " " + this.course + cur;
    }

    this.getObligatory = function () {
        return this.obligatory;
    }



}