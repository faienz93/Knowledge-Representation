$(document).ready(function () {
    InitRuleReactor(); 
    chosenPlugin();
 
    slideDownAndUp();
    setResetBtns();
    
    selectProfessors();
    selectDisciplines();
    selectClassrooms();

    setShowHideCards();
});

/**
 * This function aims to set cards view
 * @method setShowHideCards
 */
function setShowHideCards(){
    $("#cardBodyProfessor").hide();
    $("#cardBodyProfessorDelete").hide();
    var valore = $('#idProfessorUpdate').val();
    if(valore== null){
        $("#cardBodyProfessorUpdate").hide();
    }
    
    $("#cardBodyDiscipline").hide();
    $("#cardBodyDisciplineDelete").hide();
    $("#cardBodyClassRoom").hide();   
    $("#cardBodyClassRoomDelete").hide(); 
}

/**
 * This function aims to bind event to reset buttons
 * @method setResetBtns
 */
function setResetBtns(){
    // Reset value of form Add Professor 
    $('#resetAddProfessor').click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $('#professorForm')[0].reset();
    });

    // Reset value of form Update Professor 
    $('#resetUpdateProfessor').click(function () {
        $('#professorFormUpdate')[0].reset();
    });

    // Reset value of form ClassRoom 
    $('#resetClassRoomBbtn').click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $('#classRoomForm')[0].reset();
    });

    // Reset value of form Discipline 
    $('#resetDisciplineBbtn').click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $('#disciplineForm')[0].reset();
    }); 
}

/**
 * This function aims to slideUp and slideDown Panel
 * @method slideDownUp
 * REF: https://www.khanacademy.org/computer-programming/jquery-example-slideup-slidedown-and-slidetoggle/4722237555474432
 */
function slideDownAndUp(){

    // slideToggle Professor
    $("#headerProfessor").click(function(){
        $("#cardBodyProfessor").slideToggle("slow");
    });

    // slideToggle Delete Professor
    $("#headerProfessorDelete").click(function(){
        $("#cardBodyProfessorDelete").slideToggle("slow");
    });

    // slideToggle Update Professor
    $("#headerProfessorUpdate").click(function(){
        $("#cardBodyProfessorUpdate").slideToggle("slow");
    });

    // slideToggle Discipline
    $("#headerDiscipline").click(function(){
        $("#cardBodyDiscipline").slideToggle("slow");
    });

    // slideToggle Delete Discipline
    $("#headerDisciplineDelete").click(function(){
        $("#cardBodyDisciplineDelete").slideToggle("slow");
    });

    // slideToggle ClassRoom
    $("#headerClassRoom").click(function(){
        $("#cardBodyClassRoom").slideToggle("slow");
    });

    // slideToggle Delete ClassRoom
    $("#headerClassRoomDelete").click(function(){
        $("#cardBodyClassRoomDelete").slideToggle("slow");
    });


}

/**
 * Config the Chosen Plugin
 * @method chosenPlugin
 */
function chosenPlugin() {

    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-rtl': { rtl: true },
        '.chosen-select-width': { width: '95%' }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

/**
 * Query for select all professors
 * It returns: 
 *  - id
 *  - name
 *  - surname
 * @method selectProfessors
 */
function selectProfessors() {
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
                    ORDER BY ?surname`;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findProfessorDelete");
            var ddl1 = $("#findProfessorUpdate");
            var ddl2 = $("#assignProfessor");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("<option value='" + id + "'>" + name + " " + surname + "</option>");
                    ddl1.append("<option value='" + id + "'>" + name + " " + surname + "</option>");
                    ddl2.append("<option value='" + id + "'>" + name + " " + surname + "</option>");
                }

                ddl.trigger("chosen:updated");
                ddl1.trigger("chosen:updated");
                ddl2.trigger("chosen:updated");
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
function selectDisciplines() {
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

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].idDiscipline.value
                    var name = bindings[i].disciplinename.value
                    ddl.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                }

                ddl.trigger("chosen:updated");
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
function selectClassrooms() {
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
            var ddl = $("#findClassRoomDelete");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].idRoom.value
                    var name = bindings[i].classroomname.value
                    ddl.append("<option value='" + id + "'>" + id + " - " + name + "</option>");
                }

                ddl.trigger("chosen:updated");
            });

        }

    });
}


