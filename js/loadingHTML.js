/**
 * Query for select all professors
 * It returns: 
 *  - id
 *  - name
 *  - surname
 * @method selectProfessors
 */
function selectProfessorsLoading() {
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
            var ddl = $("#assignProfessorUpdate");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("{% if disci==null %}"+
                                "<option value='" + id + "'>" + name + " " + surname + "</option>"+
                                "{% else %}"+
                                    "{% if disci['isTaughtBy']=="+id+" %}"+
                                        "<option value='" + id + "' selected>" + name + " " + surname + "</option>"+
                                    "{% else %}"+
                                        "<option value='" + id + "'>" + name + " " + surname + "</option>"+
                                    "{% endif %}"+
                                "{% endif %}");
                }

                ddl.trigger("chosen:updated");
            });

        }

    });
}