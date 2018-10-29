/*
 * ===========================================================================
 * File: initEntities.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * Desc: This file contains is used by formEntities.html and hande the form
 * for add/update/delete classroom, professor, discipline
 * ===========================================================================
 */
$(document).ready(function () {
    slideDownAndUp();
    setResetBtns();

    selectAllProfessors();
    selectAllDisciplines();
    selectAllClassrooms();

    
    // When click for update professor....
    $("#buttonFindProfessor").click(function () {
        var mySelectId = $('select[name=updateTeacher]').val();
        fillFieldProfessorById(mySelectId);
    });

     // When click for update Discipline....
    $("#buttonFindDiscipline").click(function () {
        var mySelectId = $('select[name=updateDiscipline]').val();
        fillFieldDisciplineById(mySelectId);
    });

    // When click for update Classroom....
    $("#buttonFindClassroom").click(function () {
        var mySelectId = $('select[name=updateClassRoom]').val();
        fillFieldClassroomById(mySelectId);
    });

    
});



/**
 * This function aims to bind event to reset buttons
 * @method setResetBtns
 */
function setResetBtns() {
    // Reset value of form Add Professor 
    $('#resetAddProfessor').click(function () {
        $('#professorForm')[0].reset();
        $('#roleProfessorForm').val("").trigger("chosen:updated");
    });
    // Reset value of form Update Professor 
    $('#resetUpdateProfessor').click(function () {
        $('#professorFormUpdate')[0].reset();
        $('#findProfessorUpdate').val("").trigger("chosen:updated");
        $('#roleProfessorUpdate').val("").trigger("chosen:updated");
    });


    // Reset value of form Discipline 
    $('#resetDisciplineBbtn').click(function () {
        $('#disciplineForm')[0].reset();
        $('#semester').val("").trigger("chosen:updated");
        $('#findCurriculum').val("").trigger("chosen:updated");
        $('#findDisciplineYear').val("").trigger("chosen:updated");
        $('#findDisciplineCourse').val("").trigger("chosen:updated");
        $('#assignProfessor').val("").trigger("chosen:updated");
    });
    // Reset value of form Update Discipline 
    $('#resetUpdateDiscipline').click(function () {
        $('#disciplineFormUpdate')[0].reset();
        $('#findDisciplineUpdate').val("").trigger("chosen:updated");
        $('#assignProfessorUpdate').val("").trigger("chosen:updated");
        $('#determinateCourseDisciplineUpdate').val("").trigger("chosen:updated");
        $('#semesterUpdate').val("").trigger("chosen:updated");
        $('#findCurriculumUpdate').val("").trigger("chosen:updated");
        $('#findDisciplineYearUpdate').val("").trigger("chosen:updated");
        $('#findDisciplineCourseUpdate').val("").trigger("chosen:updated");
    });


    // Reset value of form ClassRoom 
    $('#resetClassRoomBbtn').click(function () {
        $('#classRoomForm')[0].reset();
        $('#blackboard').val("").trigger("chosen:updated");
    });
    // Reset value of form Update ClassRoom 
    $('#resetUpdateClassRoom').click(function () {
        $('#classRoomFormUpdate')[0].reset();
        $('#findClassRoomUpdate').val("").trigger("chosen:updated");
        $('#blackboardUpdate').val("").trigger("chosen:updated");
    });

}

/**
 * This function aims to slideUp and slideDown Panel
 * @method slideDownUp
 * REF: https://www.khanacademy.org/computer-programming/jquery-example-slideup-slidedown-and-slidetoggle/4722237555474432
 */
function slideDownAndUp() {
    // slideToggle Professor
    $('#headerProfessor').click(function () {
        $('#cardBodyProfessor').slideToggle("slow");
    });
    // slideToggle Delete Professor
    $('#headerProfessorDelete').click(function () {
        $('#findProfessorDelete_chosen').css("width", "100%");
        $('#cardBodyProfessorDelete').slideToggle("slow");
    });
    // slideToggle Update Professor
    $('#headerProfessorUpdate').click(function () {
        $('#findProfessorUpdate_chosen').css("width", "100%");
        $('#cardBodyProfessorUpdate').slideToggle("slow");
    });


    // slideToggle Discipline
    $('#headerDiscipline').click(function () {
        $('#assignProfessor_chosen').css("width", "100%");
        $('#findDisciplineCourse_chosen').css("width", "100%");
        $('#findDisciplineYear_chosen').css("width", "100%");
        $('#findCurriculum_chosen').css("width", "100%");
        $('#cardBodyDiscipline').slideToggle("slow");
    });
    // slideToggle Delete Discipline
    $('#headerDisciplineDelete').click(function () {
        $('#findDisciplineDelete_chosen').css("width", "100%");
        $('#cardBodyDisciplineDelete').slideToggle("slow");
    });
    // slideToggle Update Discipline
    $('#headerDisciplineUpdate').click(function () {        
        $('#findDisciplineUpdate_chosen').css("width", "100%");
        $('#findDisciplineCourseUpdate_chosen').css("width", "100%");
        $('#findDisciplineYearUpdate_chosen').css("width", "100%");
        $('#findCurriculumUpdate_chosen').css("width", "100%");
        $('#assignProfessorUpdate_chosen').css("width", "100%");
        $('#determinateCourseDisciplineUpdate_chosen').css("width", "100%");
        $('#cardBodyDisciplineUpdate').slideToggle("slow");
    });


    // slideToggle ClassRoom
    $('#headerClassRoom').click(function () {
        $('#cardBodyClassRoom').slideToggle("slow");
        $('#blackboard_chosen').css("width", "100%");
    });
    // slideToggle Delete ClassRoom
    $('#headerClassRoomDelete').click(function () {
        $('#findClassRoomDelete_chosen').css("width", "100%");
        $('#cardBodyClassRoomDelete').slideToggle("slow");
    });
    // slideToggle Update ClassRoom
    $('#headerUpdateClassRoom').click(function () {
        $('#findClassRoomUpdate_chosen').css("width", "100%");
        $('#cardBodyClassRoomUpdate').slideToggle("slow");
        $('#blackboardUpdate_chosen').css("width", "100%");
    });

}


/**
 * Query for select all professors
 * It returns: 
 *  - id
 *  - name
 *  - surname
 * @method selectProfessors
 */
function selectAllProfessors() {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?name ?surname ?id
                    FROM <http://www.rdcproject.com/graph/professor>
                    WHERE
                    { ?x  a uni:Teacher.
                        ?x uni:firstName ?name.
                        ?x uni:lastName ?surname.
                        ?x uni:idProfessor ?id.
                        }
                    ORDER BY ?surname ?name`;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findProfessorDelete");
            var ddl1 = $("#findProfessorUpdate");
            var ddl2 = $("#assignProfessor");
            var ddl3 = $("#assignProfessorUpdate");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("<option value='" + id + "'>" + surname + " " + name + "</option>");
                    ddl1.append("<option value='" + id + "'>" + surname + " " + name + "</option>");
                    ddl2.append("<option value='" + id + "'>" + surname + " " + name + "</option>");
                    ddl3.append("<option value='" + id + "'>" + surname + " " + name + "</option>");

                }

                ddl.trigger("chosen:updated");
                ddl1.trigger("chosen:updated");
                ddl2.trigger("chosen:updated");
                ddl3.trigger("chosen:updated");
            });

        }

    });
}

/**
 * Query for select all disciplines
 * It returns: 
 *  - id
 *  - name
 * @method selectDisciplines
 */
function selectAllDisciplines() {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?idDiscipline ?disciplinename
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    WHERE
                    { ?x  a uni:Discipline.
                        ?x uni:idDiscipline ?idDiscipline.
                        ?x uni:disciplinename ?disciplinename.
                        }
                    ORDER BY ?idDiscipline`;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findDisciplineDelete");
            var ddl1 = $("#findDisciplineUpdate");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].idDiscipline.value
                    var name = bindings[i].disciplinename.value
                    ddl.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                    ddl1.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                }

                ddl.trigger("chosen:updated");
                ddl1.trigger("chosen:updated");
            });

        }

    });
}


/**
 * Query for select all classrooms
 * It returns: 
 *  - id
 *  - name
 * @method selectClassrooms
 */
function selectAllClassrooms() {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?idRoom ?classroomname
                    FROM <http://www.rdcproject.com/graph/classrooms>
                    WHERE
                    { ?x  a uni:Classroom.
                        ?x uni:idRoom ?idRoom.
                        ?x uni:classroomname ?classroomname.
                        }
                    ORDER BY ?idRoom`;

    var encodedquery = encodeURIComponent(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $('#findClassRoomDelete');
            var ddl1 = $('#findClassRoomUpdate');
            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].idRoom.value
                    var name = bindings[i].classroomname.value
                    ddl.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                    ddl1.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                }

                ddl.trigger("chosen:updated");
                ddl1.trigger("chosen:updated");
            });

        }

    });
}


/**
 * Query selected professor base on ID
 * @method fillFieldProfessorById
 */
function fillFieldProfessorById(id) {
    var endpointURL = "http://localhost:3030/ds/query";


    var myquery = ` 
                PREFIX uni: <http://www.rdfproject.com/>
                PREFIX un: <http://www.w3.org/2007/ont/unit#>

                SELECT ?idProfessor ?lastName ?firstName ?role
                FROM <http://www.rdcproject.com/graph/professor>
                WHERE{
                        ?x a uni:Teacher;
                        uni:idProfessor ?"`+ id + `";
                        uni:idProfessor ?idProfessor;
                        uni:firstName ?firstName;
                        uni:lastName ?lastName;
                        uni:role ?role;
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
                    $('input[name=nameProfessorUpdate]').val(bindings[i].firstName.value);
                    $('input[name=surnameProfessorUpdate]').val(bindings[i].lastName.value);
                    $('input[name=idProfessorUpdate]').val(bindings[i].idProfessor.value);
                    $('select[name=roleProfessorUpdate]').val(bindings[i].role.value);

                }
            });

        }

    });
}

/**
 * Query selected discipline base on ID
 * @method fillFieldDisciplineById
 */
function fillFieldDisciplineById(id) {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` 
                        PREFIX uni: <http://www.rdfproject.com/>
                        PREFIX un: <http://www.w3.org/2007/ont/unit#>

                        SELECT  ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?semester ?totalhours ?weekhours ?year ?numStudents 
                               ?curriculum (GROUP_CONCAT(DISTINCT ?prof_str;separator=",") AS ?professors)

                        FROM <http://www.rdcproject.com/graph/disciplines>
                        FROM <http://www.rdcproject.com/graph/professor>
                        FROM <http://www.rdcproject.com/graph/course>
                        WHERE
                        { 
                                {       
                                ?x  a uni:Discipline;
                                uni:disciplinename ?disciplineName;
                                uni:idDiscipline ?'`+ id + `';
                                uni:idDiscipline ?idDiscipline;
                                uni:disciplineAbbreviation ?sigleDiscipline;
                                uni:cfu ?cfu;
                                uni:hasCourseof ?hasCourseof;
                                uni:obligatory ?obligatory;
                                uni:semester ?semester;
                                uni:totalhours ?totalhours;
                                uni:weekhours ?weekhours;
                                uni:year ?year;
                                uni:curriculum ?curriculum;
                                uni:numStudents ?numStudents;
                                uni:isTaughtBy ?isTaughtBy.
                                    ?isTaughtBy a uni:Teacher;
                                    uni:idProfessor ?idProf;
                                    uni:firstName ?firstName;
                                    uni:lastName ?lastName;
                                    uni:role ?role.
                                    ?hasCourseof a uni:Course;
                                    uni:idCourse ?idCourse.   
                                }

                            BIND(CONCAT(?idProf,'-',?firstName,'-',?lastName,'-',?role) AS ?prof_str)

                        }GROUP BY ?idDiscipline ?sigleDiscipline ?disciplineName ?cfu ?idCourse ?obligatory ?semester ?totalhours ?weekhours ?year ?numStudents ?curriculum                             
                    `;

    var encodedquery = encodeURIComponent(myquery);

    console.log(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                console.log(bindings);
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    console.log(bindings[i]);

                    var result = bindings[i].professors.value.split(",");                    
                    $('input[name=discipline_nameUpdate]').val(bindings[i].disciplineName.value);
                    $('input[name=discipline_abbUpdate]').val(bindings[i].sigleDiscipline.value);
                    $("input[name=obligatoryUpdate][value=" + bindings[i].obligatory.value + "]").attr('checked', 'checked');
                    $('input[name=cfuUpdate]').val(bindings[i].cfu.value);
                    $('input[name=id_disciplineUpdate]').val(bindings[i].idDiscipline.value);
                    $('select[name=degreeCourseUpdate]').val(bindings[i].idCourse.value).trigger("chosen:updated");
                    $('select[name=yearCourseUpdate]').val(bindings[i].year.value).trigger("chosen:updated");
                    $('select[name=curriculumCourseUpdate]').val(bindings[i].curriculum.value).trigger("chosen:updated");
                    $('select[name=semesterUpdate]').val(bindings[i].semester.value);
                    $('input[name=totalHoursUpdate]').val(bindings[i].totalhours.value);
                    $('input[name=weeksHoursUpdate]').val(bindings[i].weekhours.value);
                    $('input[name=numberStudentsUpdate]').val(bindings[i].numStudents .value);

                    var updateChosenProfessor = []; 
                    for(var i = 0; i < result.length; i++){
                        var singleProfessorID = result[i].split("-");                       
                        updateChosenProfessor.push(singleProfessorID[0]);
                    }
                    $('#assignProfessorUpdate').val(updateChosenProfessor).trigger("chosen:updated"); 
                }
            });

        }

    });

}

/**
 * Query selected Classroom base on ID
 * @method fillFieldClassroomById
 */
function fillFieldClassroomById(id) {
    var endpointURL = "http://localhost:3030/ds/query";


    var myquery = ` 
                    PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?idRoom ?classroomname ?address ?capacity ?blackboard  ?wired
                    FROM <http://www.rdcproject.com/graph/classrooms>
                    WHERE
                    { ?x  a uni:Classroom;
                            uni:idRoom ?"`+ id + `";
                            uni:idRoom ?idRoom;
                            uni:classroomname ?classroomname;
                            uni:address ?address;
                            uni:capacity ?capacity;
                            uni:blackboard  ?blackboard ;
                            uni:wired ?wired;
                        }
                    ORDER BY ?idRoom                               
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
                    console.log(bindings[i]);

                    $('input[name=classNameUpdate]').val(bindings[i].classroomname.value);
                    $('input[name=capacityUpdate]').val(bindings[i].capacity.value);
                    $("input[name=wiredUpdate][value=" + bindings[i].wired.value + "]").attr('checked', 'checked');

                    var ddl1 = $("#blackboardUpdate");
                    $("#blackboardUpdate option[value='" + bindings[i].blackboard.value + "']").prop('selected', true).change();
                    ddl1.trigger("chosen:updated");

                    $('input[name=id_roomUpdate]').val(bindings[i].idRoom.value);
                    $('input[name=addressUpdate]').val(bindings[i].address.value);
                }
            });

        }

    });

    

}
