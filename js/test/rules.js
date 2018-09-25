
var reactor = new InitRuleReactor();

// firstName,surName,id_professor,role
function Professor(firstName, surname, id, role) {
    this._firstName = firstName;
    this._surname = surname;
    this._id = id;
    this._role = role;

    this.getFirstName = function() {
        return this._firstName ;
    };
}

// id_discipline,disciplineName,semester,obligatory,totalHours,weeksHours,cfu,year,course,teacher
function Discipline(id, name, semester, obligatory, totalHours, weeksHours, cfu, year, course, teacher){
    this._id = id;
    this._name = name;
    this._semester = semester;
    this._obligatory = obligatory;
    this._totalHours = totalHours;
    this._weeksHours = weeksHours;
    this._cfu = cfu;
    this._year = year;
    this._course = course;
    this._teacher = teacher;
}

// id_room,className,address,capacity,wifi,wired
function Classroom(id, name, address, capacity, wifi, wired){
    this._id = id;
    this._name = name;
    this._address = address;
    this._capacity = capacity;
    this._wifi = wifi;
    this._wired = wired;
}


function Course(id, name) {
    this._id = id;
    this._name = name;
}


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