$(document).ready(function () {
    chosenPlugin();
 
    slideDownAndUp();
    setResetBtns();
    
    selectProfessors();

    setShowHideCards();

    $('#DivVincoli').hide();
    $('#DivSelectDay2').hide();

    var ddl1 = $("#ChooseDay1");
    var ddl2 = $("#ChooseDay2");
    generateChooseDays(ddl1);
    generateChooseDays(ddl2);

    $('#findProfessor').change(function() {
        $('#DivVincoli').show();
        //TODO get constraints from db
    });

    $('.checkDisc').click(function() {
        $('.checkDisc').not(this).prop('checked', false);
    });
    $('.checkConse').click(function() {
        $('.checkConse').not(this).prop('checked', false);
    });
    $('.checkChalks').click(function() {
        $('.checkChalks').not(this).prop('checked', false);
    });

    $('#ConsecutiveDays input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {            
            $('#RowSelectDays').hide();
        }
        else{
            $('#RowSelectDays').show();
        }
    });

    $('#ChooseDay1').change(function() {
        var day1 = $('#ChooseDay1').val();
        if(day1=="0"){
            $('#DivSelectDay2').hide();
        }
        else{
            $('#DivSelectDay2').show();
        }
    });


});

/**
 * This function aims to set cards view
 * @method setShowHideCards
 */
function setShowHideCards(){
    $('#cardBodyConstraint').hide();
   
}

/**
 * This function aims to bind event to reset buttons
 * @method setResetBtns
 */
function setResetBtns(){
    // Reset value of form Add Professor 
    $('#resetConstraint').click(function () {
        $('#constraintForm')[0].reset();
    });  
}

/**
 * This function aims to slideUp and slideDown Panel
 * @method slideDownUp
 * REF: https://www.khanacademy.org/computer-programming/jquery-example-slideup-slidedown-and-slidetoggle/4722237555474432
 */
function slideDownAndUp(){
    // slideToggle Professor
    $('#headerConstraint').click(function(){
        $('#cardBodyConstraint').slideToggle("slow");
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
 * Genera la lista dei giorni della settimana
 */
function generateChooseDays(ddl){
    ddl.append("<option value='0'>Nessuna Preferenza</option>");
    ddl.append("<option value='1'>Lunedì</option>");
    ddl.append("<option value='2'>Martedì</option>");
    ddl.append("<option value='3'>Mercoledì</option>");
    ddl.append("<option value='4'>Giovedì</option>");
    ddl.append("<option value='5'>Venerdì</option>");

    ddl.trigger("chosen:updated");
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
                    ORDER BY ?surname ?name`;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findProfessor");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("<option value='" + id + "'>" + surname + " " + name + "</option>");
                }
                ddl.trigger("chosen:updated");
            });

        }

    });
}

/**
 * Query for select all disciplines of a professor
 * It returns: 
 *  - id
 *  - code
 *  - name
 * @method selectDisciplines
 */
function selectDisciplines(prof) {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?idDiscipline ?disciplinename
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    WHERE
                    { ?x  a uni:Discipline.
                        ?x uni:idDiscipline ?idDiscipline.
                        ?x uni:disciplinename ?disciplinename.
                        ?x uni:isTaughtBy ? uni:`+ prof +`;
                        }
                    ORDER BY ?disciplinename`;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findDiscipline");
            ddl.html("<option value=''></option>");
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
 * Query for select a discipline
 * @method selectSingleDiscipline
 */
function selectSingleDiscipline(id) {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?weekhours
                    FROM <http://www.rdcproject.com/graph/disciplines>
                    WHERE
                    { ?x  a uni:Discipline.
                        ?x uni:idDiscipline ? "`+ id +`".
                        ?x uni:weekhours ?weekhours.
                        }
                    `;

    var encodedquery = encodeURIComponent(myquery);


    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            $.each(results, function (index, element) {
                var bindings = element.bindings;
                for (i in bindings) {
                    var weekhours = bindings[i].weekhours.value
                    $('#weekHours').val(weekhours);                   
                    $('#RowConsecutiveDays').show();
                    
                    if (weekhours == "6"){
                        $('#RowDiscipline6H').show();  
                    }
                    else{
                        $('#RowDiscipline6H').hide();   
                    }
                }
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
 * Query selected classroom
 * It returns all the data
 * @method findClassRoom
 */
// function findClassRoom(){
//     var endpointURL = "http://localhost:3030/ds/query";

//     var roomId = $('#findClassRoomUpdate').val();
//     var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
//                     PREFIX un: <http://www.w3.org/2007/ont/unit#>

//                     SELECT ?idRoom ?classroomname ?address ?capacity ?wifi ?wired
//                     FROM <http://www.rdcproject.com/graph/classrooms>
//                     WHERE
//                     { ?x  a uni:Classroom;
//                             uni:idRoom ?"`+ roomId +`";
//                             uni:idRoom ?idRoom;
//                             uni:classroomname ?classroomname;
//                             uni:address ?address;
//                             uni:capacity ?capacity;
//                             uni:wifi ?wifi;
//                             uni:wired ?wired;
//                         }
//                     ORDER BY ?idRoom`;

//     var encodedquery = encodeURIComponent(myquery);

//     $.ajax({
//         dataType: "jsonp",
//         url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
//         success: function (results) {
//             alert("ci sono")
//             $.each(results, function (index, element) {
//                 var bindings = element.bindings;
//                 // REF: https://www.w3.org/TR/rdf-sparql-json-res/
//                 for (i in bindings) {
//                     var idRoom = bindings[i].idRoom.value
//                     var classroomname = bindings[i].classroomname.value
//                     var address = bindings[i].address.value
//                     var capacity = bindings[i].capacity.value
//                     var wifi = bindings[i].wifi.value
//                     var wired = bindings[i].wired.value
//                     $('#findClassRoomUpdate').val(idRoom)
//                     $('#classNameUpdate').val(classroomname)
//                     $('#findClassRoomUpdate').val(address)
//                     $('#capacityUpdate').val(capacity)
//                     $('#findClassRoomUpdate').val(wifi)
//                     $('#findClassRoomUpdate').val(wired)
//                 }
//             });

//         }

//     });
// }

