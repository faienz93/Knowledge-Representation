
var reactor = new InitRuleReactor();




function CreateRules() {
    reactor.createRule("ProfExists", 0, { p: Professor },
        function (p) {
            return p.firstName == "Mauro" && p.surname == "Gaspari";
        },
        function (p) {
            console.log("BELLO FIGO: " + p.name);
        });
}



function CreateInitialDS() {
    var p = new Professor("Mauro", "Gaspari");
    reactor.assert(p);
    reactor.trace(3);
    reactor.run(Infinity, true, function () {
        console.log(JSON.stringify(p));
    });
}


// costruttore iniziale
function InitRuleReactor() {
    reactor = new RuleReactor();
    reactor.trace(3);
    CreateRules();
    CreateInitialDS();
}