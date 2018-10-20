$(document).ready(function () {
    chosenPlugin();
 
    slideDownAndUp();
    setResetBtns();
    
    selectProfessors();

    setShowHideCards();

    $('#DivVincoli').hide();
    $('#DivSelectDay2').hide();

    var ddl1 = $("#ChooseDay1");
    generateChooseDays(ddl1);

    $('#findProfessor').change(function() {
        $('#DivVincoli').show();
        //TODO get constraints from db
        var prof = $('#findProfessor').val();
        selectPreference(prof)
    });

    $('#deleteConstraint').click(function() {
        var prof = $('#findProfessor').val();
        deletePreference(prof)
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
    $('.checkAMPM').click(function() {
        $('.checkAMPM').not(this).prop('checked', false);
    });

    $('#ConsecutiveDays input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {                       
            $('#RowNoLessonDays').hide();
            var ddl1 = $("#ChooseDay1");
            generateChooseDays(ddl1);

            $('#RowNoLessonAMPM').hide();
            $('.checkAMPM').not(this).prop('checked', false);
        }
        else{
            $('#RowNoLessonDays').show();
            $('#RowNoLessonAMPM').show();
        }
    });

    $('#ChooseDay1').change(function() {
        var day1 = $('#ChooseDay1').val();
        if(day1 == ''){
            $('#DivSelectDay2').hide();
            $('#RowConsecutiveDays').show();
            $('#RowNoLessonAMPM').show();
        }
        else{
            $('#RowConsecutiveDays').hide();
            $('.checkConse').not(this).prop('checked', false);

            $('#DivSelectDay2').show();
            var ddl2 = $("#ChooseDay2");
            generateChooseDays(ddl2);
            $("#ChooseDay2 option[value='" + day1 + "']").remove();
            $("#ChooseDay2  option[value='']");
            ddl2.trigger("chosen:updated");

            $('#RowNoLessonAMPM').hide();
            $('.checkAMPM').not(this).prop('checked', false);
        }
    });

    $('#NoLessonAMPM input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {            
            $('#RowNoLessonDays').hide();
            var ddl1 = $("#ChooseDay1");
            generateChooseDays(ddl1);

            $('#RowConsecutiveDays').hide();
            $('.checkConse').not(this).prop('checked', false);
        }
        else{
            $('#RowNoLessonDays').show();
            $('#RowConsecutiveDays').show();
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
    ddl.empty();
    ddl.append("<option value='' selected>Nessuna Preferenza</option>");
    ddl.append("<option value='monday'>Lunedì</option>");
    ddl.append("<option value='tuesday'>Martedì</option>");
    ddl.append("<option value='wednesday'>Mercoledì</option>");
    ddl.append("<option value='thursday'>Giovedì</option>");
    ddl.append("<option value='friday'>Venerdì</option>"); 
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
 * Query for select all preferences of a professor
 * @method selectDisciplines
 */
function selectPreference(prof) {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?sixHourSplit ?consecutiveDays ?noLessonDay1 ?noLessonDay2 ?noLessonAMPM ?writeMethodRoom
                    FROM <http://www.rdcproject.com/graph/preferences>
                    WHERE
                    { ?x  a uni:Preference.
                        ?x uni:sixHourSplit ?sixHourSplit.
                        ?x uni:consecutiveDays ?consecutiveDays.
                        ?x uni:noLessonDay1 ?noLessonDay1.
                        ?x uni:noLessonDay2 ?noLessonDay2.
                        ?x uni:noLessonAMPM ?noLessonAMPM.
                        ?x uni:writeMethodRoom ?writeMethodRoom.
                        ?x uni:isPreferenceOf ? uni:`+ prof +`;
                        }
                    ORDER BY ?isPreferenceOf`;

    var encodedquery = encodeURIComponent(myquery);

    console.log(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // reset values
            var ddl1 = $("#ChooseDay1");
            generateChooseDays(ddl1);
            var day1 = $('#ChooseDay1').val();
            var ddl2 = $("#ChooseDay2");
            generateChooseDays(ddl2);
            $("#ChooseDay2 option[value='" + day1 + "']").remove();
            $("#ChooseDay2  option[value='']");
            ddl2.trigger("chosen:updated");

            $('.checkDisc').prop('checked', false).change();
            $('.checkConse').prop('checked', false).change();           
            $('.checkAMPM').prop('checked', false).change();
            $('.checkChalks').prop('checked', false).change();

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var sixHourSplit = bindings[0].sixHourSplit.value
                    var consecutiveDays = bindings[0].consecutiveDays.value
                    var noLessonDay1 = bindings[0].noLessonDay1.value
                    var noLessonDay2 = bindings[0].noLessonDay2.value
                    var noLessonAMPM = bindings[0].noLessonAMPM.value
                    var writeMethodRoom = bindings[0].writeMethodRoom.value

                    $('#constraintForm').attr('action', 'http://127.0.0.1:5000/updatePreference');

                    // set new values
                    $("#ChooseDay1 option[value='" + noLessonDay1 + "']").prop('selected', true).change();
                    ddl1.trigger("chosen:updated");
                    $("#ChooseDay2 option[value='" + noLessonDay2 + "']").prop('selected', true).change();
                    ddl2.trigger("chosen:updated");                    
                    $('#Discipline6H input[type=checkbox][value="'+sixHourSplit+'"]').prop('checked', true).change();
                    $('#ConsecutiveDays input[type=checkbox][value="'+consecutiveDays+'"]').prop('checked', true).change();                  
                    $('#NoLessonAMPM input[type=checkbox][value="'+noLessonAMPM+'"]').prop('checked', true).change();
                    $('#writeMethodRoom input[type=checkbox][value="'+writeMethodRoom+'"]').prop('checked', true).change();
                }
            });

        }

    });
}

/**
 * Delete all preferences of a professor
 * @method selectDisciplines
 */
function deletePreference(prof) {
    var endpointURL = "http://localhost:3030/ds/update";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>
                    DELETE WHERE { 
                        GRAPH <http://www.rdcproject.com/graph/preferences> {
                                ?object uni:isPreferenceOf ? uni:`+prof+`;
                                ?property  ?value 
                        }
                    }`;

    var encodedquery = encodeURIComponent(myquery);

    console.log(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {
            location.reload();
        }

    });
}


