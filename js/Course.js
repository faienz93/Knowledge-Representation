function Course(id, name) {
    this.id = id;
    this.name = name;


    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }


    this.toString = function () {
        return this.id + " " + this.name;
    };
}