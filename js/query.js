// 
// Query Professors
// 
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
// 
// Query Classes
// 
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

// 
// Query Course
// 
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

// 
// Query Discipline
// 
function queryDisciplines() {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
    PREFIX un: <http://www.w3.org/2007/ont/unit#>

    SELECT  ?id ?abbreviation ?disciplineName ?cfu ?hasCourseof ?isTaughtBy ?obligatory ?semester ?totalhours ?weekhours ?year
    FROM <http://www.rdcproject.com/graph/disciplines>
    WHERE
    {   ?x  a uni:Discipline;
        uni:idDiscipline ?id;
        uni:disciplinename ?disciplineName;
        uni:disciplineAbbreviation ?abbreviation;
        uni:cfu ?cfu;
        uni:hasCourseof ?hasCourseof;
        uni:isTaughtBy ?isTaughtBy;
        uni:obligatory ?obligatory;
        uni:semester ?semester;
        uni:totalhours ?totalhours;
        uni:weekhours ?weekhours;
        uni:year ?year.                      
        
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
                    var abbreviation = bindings[i].abbreviation.value;//TODO aggiungere abbreviation
                    var name = bindings[i].disciplineName.value;
                    var semester = bindings[i].semester.value;
                    var obligatory = bindings[i].obligatory.value;
                    var totalHours = bindings[i].totalhours.value;
                    var weeksHours = bindings[i].weekhours.value;
                    var cfu = bindings[i].cfu.value;
                    var year = bindings[i].year.value;
                    var numStudents = 29;//TODO aggiungere numstudents

                    var course = bindings[i].hasCourseof.value;//TODO eliminare corsi curriculum
                    var teacher = bindings[i].isTaughtBy.value;//

                    var discipline = new Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year, numStudents);
                    result.push(discipline);
                }

            });

        }

    });
    return result;
}

//
// Query professor teaches a subject
//
function queryDisciplineProfessor(idDiscipline) {
    var result = [];
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = `	PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>
    
                    SELECT ?id 
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    FROM <http://www.rdcproject.com/graph/professor>
                    WHERE{
                            ?x  a uni:Discipline;
                            uni:idDiscipline "`+ idDiscipline + `";
                            uni:isTaughtBy ?idProf.
                            ?idProf a uni:Teacher;
                            uni:idProfessor ?id.
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
                    var teacher = bindings[i].id.value;
                    result.push(teacher);
                }

            });

        }

    });
    return result;
}