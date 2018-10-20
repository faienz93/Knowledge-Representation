/**
 * ===========================================================================
 * File: query.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file make a query from db for create a different Entities
 * ===========================================================================
 */


/***********************************
 * Query Professors
 ************************************/
function queryProfessors() {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?id ?name ?surname ?role
                    FROM <http://www.rdcproject.com/graph/professor>
                    WHERE
                    { ?x  a uni:Teacher.
                        ?x uni:idProfessor ?id.
                        ?x uni:firstName ?name.
                        ?x uni:lastName ?surname.
                        ?x uni:role ?role.                        
                        }
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var name = bindings[i].name.value;
                    var surname = bindings[i].surname.value;
                    var id = bindings[i].id.value;
                    var role = bindings[i].role.value;

                    var professor = new Professor(name, surname, id, role);
                    result.push(professor);
                }

            });

        }

    });

    return result;
}

/***********************************
 * Query Classes
 ************************************/
function queryClassrooms() {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?id ?classroomname ?address ?capacity ?wifi ?wired
                    FROM <http://www.rdcproject.com/graph/classrooms>
                    WHERE
                    { ?x  a uni:Classroom.
                        ?x uni:idRoom ?id.
                        ?x uni:classroomname ?classroomname.
                        ?x uni:address ?address.
                        ?x uni:capacity ?capacity.
                        ?x uni:wifi ?wifi.
                        ?x uni:wired ?wired.
                        }
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value;
                    var name = bindings[i].classroomname.value;
                    var address = bindings[i].address.value;
                    var capacity = bindings[i].capacity.value;
                    var chalk = bindings[i].wifi.value;//TODO cambiare in chalk
                    var wired = bindings[i].wired.value;//TODO eliminare?

                    var room = new Classroom(id, name, address, capacity, chalk, wired);
                    result.push(room);
                }

            });

        }

    });
    return result;
}


/***********************************
 * Query Course
 ************************************/
function queryCourses() {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?id ?courseName 
                    FROM <http://www.rdcproject.com/graph/course>
                    WHERE
                    { ?x  a uni:Course.
                        ?x uni:idCourse ?id.
                        ?x uni:courseName ?courseName.
                    }
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value;
                    var courseName = bindings[i].courseName.value;
                    var course = new Course(id, courseName);
                    result.push(course);
                }

            });

        }

    });
    return result;
}


/***********************************
 * Query Discipline
 ************************************/
// function queryDisciplines() {
//     var result = [];
//     var endpointURL = "http://localhost:3030/ds/query";

//     var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
//     PREFIX un: <http://www.w3.org/2007/ont/unit#>

//     SELECT  ?id ?abbreviation ?disciplineName ?cfu ?hasCourseof ?isTaughtBy ?obligatory ?semester ?totalhours ?weekhours ?year ?teacher
//     FROM <http://www.rdcproject.com/graph/disciplines>
//     FROM <http://www.rdcproject.com/graph/professor>
//     WHERE
//     {   ?x  a uni:Discipline;
//         uni:idDiscipline ?id;
//         uni:disciplinename ?disciplineName;
//         uni:disciplineAbbreviation ?abbreviation;
//         uni:cfu ?cfu;
//         uni:hasCourseof ?hasCourseof;
//         uni:isTaughtBy ?isTaughtBy;
//         uni:obligatory ?obligatory;
//         uni:semester ?semester;
//         uni:totalhours ?totalhours;
//         uni:weekhours ?weekhours;
//         uni:year ?year.
//         ?isTaughtBy a uni:Teacher;
//         uni:idProfessor ?teacher.



// //     }
// //                     `;

// //     var encodedquery = encodeURIComponent(myquery);

//     $.ajax({
//         dataType: "jsonp",
//         url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
//         success: function (results) {
//             $.each(results, function (index, element) {
//                 var bindings = element.bindings;
//                 // REF: https://www.w3.org/TR/rdf-sparql-json-res/
//                 for (i in bindings) {
//                     var id = bindings[i].id.value;
//                     var abbreviation = bindings[i].abbreviation.value;//TODO aggiungere abbreviation
//                     var name = bindings[i].disciplineName.value;
//                     var semester = bindings[i].semester.value;
//                     var obligatory = bindings[i].obligatory.value;
//                     var totalHours = bindings[i].totalhours.value;
//                     var weeksHours = bindings[i].weekhours.value;
//                     var cfu = bindings[i].cfu.value;
//                     var year = bindings[i].year.value;
//                     var numStudents = 29;//TODO aggiungere numstudents

//                     var course = bindings[i].hasCourseof.value;//TODO eliminare corsi curriculum
//                     var teacher = bindings[i].teacher.value;//
//                     // console.log(teacher)
//                     var discipline = new Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year, numStudents);
//                     discipline.setProfessor(teacher);
//                     result.push(discipline);
//                 }


/***********************************
 * Query Professors teacher a subject
 ************************************/
// function queryDisciplineProfessor(idDiscipline) {
//     var result = [];
//     var endpointURL = "http://localhost:3030/ds/query";

//     var myquery = `	PREFIX uni: <http://www.rdfproject.com/>
//                     PREFIX un: <http://www.w3.org/2007/ont/unit#>

//                     SELECT ?id 
//                     FROM <http://www.rdcproject.com/graph/disciplines>
//                     FROM <http://www.rdcproject.com/graph/professor>
//                     WHERE{
//                             ?x  a uni:Discipline;
//                             uni:idDiscipline "`+ idDiscipline + `";
//                             uni:isTaughtBy ?idProf.
//                             ?idProf a uni:Teacher;
//                             uni:idProfessor ?id.
//                         }
//                     `;

//     var encodedquery = encodeURIComponent(myquery);


//     $.ajax({
//         dataType: "jsonp",
//         url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
//         success: function (results) {
//             $.each(results, function (index, element) {
//                 var bindings = element.bindings;
//                 // REF: https://www.w3.org/TR/rdf-sparql-json-res/
//                 for (i in bindings) {
//                     var teacher = bindings[i].id.value;
//                     result.push(teacher);
//                 }

//             });

//         }

//     });
//     return result;
// }


/***********************************
 * Query Professors teacher a subject
 * REF: https://stackoverflow.com/a/18214142/4700162
 * @method queryDiscipline
 ************************************/
function queryDiscipline() {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = `
                    PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?semester ?totalhours ?weekhours ?year 
                            (GROUP_CONCAT(DISTINCT ?prof_str;separator=",") AS ?professors)

                    FROM <http://www.rdcproject.com/graph/disciplines>
                    FROM <http://www.rdcproject.com/graph/professor>
                    FROM <http://www.rdcproject.com/graph/course>
                    WHERE
                    { 
                            {       
                            ?x  a uni:Discipline;
                            uni:disciplinename ?disciplineName;
                            uni:idDiscipline ?idDiscipline;
                            uni:disciplineAbbreviation ?sigleDiscipline;
                            uni:cfu ?cfu;
                            uni:hasCourseof ?hasCourseof;
                            uni:obligatory ?obligatory;
                            uni:semester ?semester;
                            uni:totalhours ?totalhours;
                            uni:weekhours ?weekhours;
                            uni:year ?year;
                            uni:isTaughtBy ?isTaughtBy.
                                ?isTaughtBy a uni:Teacher;
                                uni:idProfessor ?idProf;
                                uni:firstName ?firstName;
                                uni:lastName ?lastName;
                                uni:role ?role.
                            ?hasCourseof a uni:Course;
                                uni:idCourse ?idCourse.
                                
                                
                            }

                        BIND(CONCAT(?idProf) AS ?prof_str)

                    }GROUP BY ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?semester ?totalhours ?weekhours ?year  	
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var bindings = element.bindings;
               
                for (i in bindings) {
                    var d = new Discipline(bindings[i].idDiscipline.value, bindings[i].sigleDiscipline.value, bindings[i].disciplineName.value, bindings[i].semester.value,
                                           bindings[i].obligatory.value, bindings[i].totalhours.value, bindings[i].weekhours.value, bindings[i].cfu.value, bindings[i].year.value, 29);
                    d.setCourse(bindings[i].idCourse.value);
                    var idProfs = bindings[i].professors.value.split(",");
                    for(var p = 0; p < idProfs.length;p++){
                        d.setProfessor(idProfs[p]);
                    }                    
                    result.push(d);
                }

            });

        }

    });
    return result;
}






//MEMO
// PREFIX uni: <http://www.rdfproject.com/>
//     PREFIX un: <http://www.w3.org/2007/ont/unit#>

//     SELECT ?id ?abbreviation ?disciplineName ?cfu ?hasCourseof ?isTaughtBy ?obligatory ?semester ?totalhours ?weekhours ?year ?teacher ?teacher2
//     FROM <http://www.rdcproject.com/graph/disciplines>
//     FROM <http://www.rdcproject.com/graph/professor>
//     WHERE
//     {   ?x  a uni:Discipline;
//         uni:idDiscipline ?id;
//         uni:disciplinename  ?disciplineName;
//         uni:disciplineAbbreviation ?abbreviation;
//         uni:cfu ?cfu;
//         uni:hasCourseof ?hasCourseof;
//         uni:isTaughtBy ?isTaughtBy;
//         uni:obligatory ?obligatory;
//         uni:semester ?semester;
//         uni:totalhours ?totalhours;
//         uni:weekhours ?weekhours;
//         uni:year ?year.
//         ?isTaughtBy a uni:Teacher;                    
//         uni:idProfessor ?teacher.
//         OPTIONAL { ?isTaughtBy a uni:Teacher;
//          uni:idProfessor  ?teacher2 .FILTER (?teacher != ?teacher2) }


//     }GROUP BY ?id ?abbreviation ?disciplineName ?cfu ?hasCourseof ?isTaughtBy ?obligatory ?semester ?totalhours ?weekhours ?year ?teacher ?teacher2