$(document).ready(function () {
    // alert("PROVA");
    InitRuleReactor(); 

    chosenPlugin();

    $("#cardBodyProfessor").hide();
    $("#cardBodyDiscipline").hide();
    $("#cardBodyClassRoom").hide();
    $("#cardBodyProfessorDelete").hide();
    
    slideDownAndUp();

    selectProfessor();

    // Reset value of form Professor 
    $("#resetProfessorBbtn").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#professorForm")[0].reset();
    });

    


    // Reset value of form ClassRoom 
    $("#resetClassRoomBbtn").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#classRoomForm")[0].reset();
    });

    // Reset value of form Discipline 
    $("#resetDisciplineBbtn").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#disciplineForm")[0].reset();
    });



    


});

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

    // slideToggle Discipline
    $("#headerDiscipline").click(function(){
        $("#cardBodyDiscipline").slideToggle("slow");
    });

    // slideToggle ClassRoom
    $("#headerClassRoom").click(function(){
        $("#cardBodyClassRoom").slideToggle("slow");
    });

    // var $this = $('#ciao');
    // if (!$this.hasClass('panel-collapsed')) {
    //     $this.parents('.panel').find('.panel-body').slideUp("slow");
    //     $this.addClass('panel-collapsed');
    //     // $this.removeClass('oi oi-minus').addClass('oi oi-plus');
    // } else {
    //     $this.parents('.panel').find('.panel-body').slideDown("slow");
    //     $this.removeClass('panel-collapsed');
    //     // $this.removeClass('oi oi-plus').addClass('oi oi-minus');
    // }
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
 * Query for select all professor
 * It return: 
 *  - id
 *  - name
 *  - surname
 * @method selectProfessor
 */
function selectProfessor() {

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
            var ddl = $("#assignProfessor");
            $.each(results, function (index, element) {

               
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("<option value='" + id + "'>" + name + " " + surname + "</option>");
                }

                ddl.trigger("chosen:updated");

            });

        }

    });
}