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

    $('.ui.dropdown')
        .dropdown()
        ;
        
    $('.max.example .ui.normal.dropdown')
        .dropdown({
            maxSelections: 3
        })
        ;
    $('.max.example .ui.special.dropdown')
        .dropdown({
            useLabels: false,
            maxSelections: 3
        })
        ;
});