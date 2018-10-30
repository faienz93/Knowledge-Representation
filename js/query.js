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
function queryProfessors(returnValue, callback) {
    
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
                var result = [];
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

                callback(result);

            });

        }

    });

    
}

/***********************************
 * Query Classes
 ************************************/
function queryClassrooms(returnValue, callback) {
    
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?id ?classroomname ?address ?capacity ?blackboard ?wired
                    FROM <http://www.rdcproject.com/graph/classrooms>
                    WHERE
                    { ?x  a uni:Classroom.
                        ?x uni:idRoom ?id.
                        ?x uni:classroomname ?classroomname.
                        ?x uni:address ?address.
                        ?x uni:capacity ?capacity.
                        ?x uni:blackboard ?blackboard.
                        ?x uni:wired ?wired.
                        }
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var result = [];
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value;
                    var name = bindings[i].classroomname.value;
                    var address = bindings[i].address.value;
                    var capacity = bindings[i].capacity.value;
                    var blackboard = bindings[i].blackboard.value;
                    var wired = bindings[i].wired.value;

                    var room = new Classroom(id, name, address, parseInt(capacity), blackboard, wired);
                    result.push(room);
                }
                callback(result);

            });

        }

    });
    
}


/***********************************
 * Query Course
 ************************************/
function queryCourses(returnValue, callback) {
   
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
                var result = [];
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value;
                    var courseName = bindings[i].courseName.value;
                    var course = new Course(id, courseName);
                    result.push(course);
                }
                callback(result);
            });

        }

    });
   
}


/***********************************
 * Query Professors teacher a subject
 * REF: https://stackoverflow.com/a/18214142/4700162
 * @method queryDiscipline
 ************************************/
function queryDiscipline(c,y,sem) {   
    var endpointURL = "http://localhost:3030/ds/query";
    var myquery;
    if(c=="ALL"){
        myquery = `
                    PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?curriculum ?semester ?totalhours ?weekhours ?year 
                            (GROUP_CONCAT(DISTINCT ?prof_str;separator=",") AS ?professors) ?numStudents
                            (GROUP_CONCAT(DISTINCT ?preference_str;separator="|") AS ?preferences)
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    FROM <http://www.rdcproject.com/graph/professor>
                    FROM <http://www.rdcproject.com/graph/course>
                    FROM <http://www.rdcproject.com/graph/preferences>
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
                            uni:curriculum ?curriculum;
                            uni:semester ?semester;
                            uni:semester "`+sem+`";
                            uni:totalhours ?totalhours;
                            uni:weekhours ?weekhours;
                            uni:year ?year;
                            uni:year "`+y+`";
                            uni:numStudents  ?numStudents;
                            uni:isTaughtBy ?isTaughtBy.
                                ?isTaughtBy a uni:Teacher;
                                uni:idProfessor ?idProf;
                                uni:firstName ?firstName;
                                uni:lastName ?lastName;
                                uni:role ?role.
                            ?hasCourseof a uni:Course;
                                uni:idCourse ?idCourse.
                    OPTIONAL{?isTaughtBy a uni:Preference;                
                                uni:consecutiveDays ?consecutiveDays;
                                uni:noLessonAMPM ?noLessonAMPM;
                                uni:noLessonDay1 ?noLessonDay1;
                                uni:noLessonDay2 ?noLessonDay2;
                                uni:sixHourSplit ?sixHourSplit;
                                uni:writeMethodRoom ?writeMethodRoom
                    }
                            }

                        BIND(CONCAT(?idProf) AS ?prof_str)
                        BIND(CONCAT(
                    "consecutivedays:",?consecutiveDays,",",      
                    "setperiodofday:",?noLessonAMPM,",",
                    "avoidlessonday1:",?noLessonDay1,",",
                    "avoidlessonday2:",?noLessonDay2,",",
                    "splitdurationlessons6h:",?sixHourSplit,",",
                    "blackboard:",?writeMethodRoom)
                    AS ?preference_str)

                    }GROUP BY ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?curriculum ?semester 
                    ?totalhours ?weekhours ?year ?numStudents ?preferences		
                    `;
    }else {
        myquery = `
                    PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT  ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?curriculum ?semester ?totalhours ?weekhours ?year 
                            (GROUP_CONCAT(DISTINCT ?prof_str;separator=",") AS ?professors) ?numStudents
                            (GROUP_CONCAT(DISTINCT ?preference_str;separator="|") AS ?preferences)
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    FROM <http://www.rdcproject.com/graph/professor>
                    FROM <http://www.rdcproject.com/graph/course>
                    FROM <http://www.rdcproject.com/graph/preferences>
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
                            uni:curriculum ?curriculum;
                            uni:semester ?semester;
                            uni:semester "`+sem+`";
                            uni:totalhours ?totalhours;
                            uni:weekhours ?weekhours;
                            uni:year ?year;
                            uni:year "`+y+`";
                            uni:numStudents  ?numStudents;
                            uni:isTaughtBy ?isTaughtBy.
                                ?isTaughtBy a uni:Teacher;
                                uni:idProfessor ?idProf;
                                uni:firstName ?firstName;
                                uni:lastName ?lastName;
                                uni:role ?role.
                            ?hasCourseof a uni:Course;
                                uni:idCourse ?idCourse;
                                uni:idCourse "`+c+`".
                    OPTIONAL{?isTaughtBy a uni:Preference;                
                                uni:consecutiveDays ?consecutiveDays;
                                uni:noLessonAMPM ?noLessonAMPM;
                                uni:noLessonDay1 ?noLessonDay1;
                                uni:noLessonDay2 ?noLessonDay2;
                                uni:sixHourSplit ?sixHourSplit;
                                uni:writeMethodRoom ?writeMethodRoom
                    }
                            }

                        BIND(CONCAT(?idProf) AS ?prof_str)
                        BIND(CONCAT(
                    "consecutivedays:",?consecutiveDays,",",      
                    "setperiodofday:",?noLessonAMPM,",",
                    "avoidlessonday1:",?noLessonDay1,",",
                    "avoidlessonday2:",?noLessonDay2,",",
                    "splitdurationlessons6h:",?sixHourSplit,",",
                    "blackboard:",?writeMethodRoom)
                    AS ?preference_str)

                    }GROUP BY ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?curriculum ?semester 
                    ?totalhours ?weekhours ?year ?numStudents ?preferences		
                    `;
    }

    

    var encodedquery = encodeURIComponent(myquery);

    return new Promise(function (resolve, reject) {
        $.ajax({
            dataType: "jsonp",
            url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
            success: function (results) {
                $.each(results, function (index, element) {
                    
                    var result = [];
                    var bindings = element.bindings;                
                    
                    for (i in bindings) {
                              var d = new Discipline(
                              bindings[i].idDiscipline.value,
                              bindings[i].sigleDiscipline.value,
                              bindings[i].disciplineName.value,
                              bindings[i].semester.value,
                              bindings[i].obligatory.value, 
                              splitCurriculum(bindings[i].curriculum.value), 
                              bindings[i].totalhours.value, 
                              bindings[i].weekhours.value, 
                              bindings[i].cfu.value, 
                              bindings[i].year.value, 
                              parseInt(bindings[i].numStudents.value)
                              );
                        d.setCourse(bindings[i].idCourse.value);
                        var idProfs = bindings[i].professors.value.split(",");
                        for(var p = 0; p < idProfs.length;p++){
                            d.setProfessor(idProfs[p]);
                        }
                       
                        var profPreferences = bindings[i].preferences; 
                        if(profPreferences!=undefined){
                            var profPreferencesSplit=profPreferences.value.split("|");
                            for(var p = 0; p < profPreferencesSplit.length;p++){
                               d.setPreferences(profPreferencesSplit[p])                               
                            }
                        }
                                          
                        result.push(d);
                    }   
                    if(result.length > 0){
                        resolve(result);
                    }
                        
                });    
            }
    
        });
    });

    
   
}






