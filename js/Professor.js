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

    this.getId = function(){
        return this.id;
    }

    this.getCompleteName = function () {
        return this.name + " " + this.surname;
    }

    // https://stackoverflow.com/a/8217584/4700162
    this.checkExistProfessor = function(arr,idP) {
        if (arr.some(e => e.id === idP)) {
            return true;
        }else {
            return false;
        }
    }
}