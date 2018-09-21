$(document).ready(function () {
    // alert("PROVA");
    // InitRuleReactor();   

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

    var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : { allow_single_deselect: true },
        '.chosen-select-no-single' : { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-rtl'       : { rtl: true },
        '.chosen-select-width'     : { width: '95%' }
      }
      for (var selector in config) {
        $(selector).chosen(config[selector]);
      }
});