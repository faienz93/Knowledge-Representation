"use strict";
var reactor = null;

function assert() { return reactor.assert.apply(reactor,arguments); }
function not() { return reactor.not.apply(reactor,arguments); }
function exists() { return reactor.exists.apply(reactor,arguments); }
function forAll() { return reactor.forAll.apply(reactor,arguments); }

function Professor(name,surname){
    this.name = name;
    this.surname = surname;
}


function CreateRules(){
    reactor.createRule("ProfExists",0,{p: Professor},
        [function(p) {
            return p.name =="Mauro" && p.surname=="Gaspari";
        }],
        function(p) {
            console.log("BELLO FIGO: " + p.name);
        });
    
}

function CreateInitialDS(){
    var p = new Professor("Mauro","Gaspari");
    reactor.assert(p);
    // reactor.retract(p);
    reactor.run(Infinity,true,function() { 
         console.log(JSON.stringify(p)); 
    });
}


// costruttore iniziale
function InitRuleReactor(){
    reactor = new RuleReactor();
    reactor.trace(3);
    CreateRules();
    CreateInitialDS();
}