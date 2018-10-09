// firstName,surName,id_professor,role
function Professor(name, surname, id, role) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.role = role;

    this.getName = function () {
        return this.name;
    };

    this.getSurname = function () {
        return this.surname;
    };

    // this.getCompleteName() = function () {
    //     return this.name + " " + this.surname;
    // }
}