// id_room,className,address,capacity,wifi,wired
function Classroom(id, name, address, capacity, wifi, wired) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.wifi = wifi;
    this.wired = wired;

    this.getId = function () {
        return this.id;
    }

    this.getName = function () {
        return this.name;
    }


    this.getAddress = function () {
        return this.address;
    }
    this.getCapacity = function () {
        return this.capacity;
    }

    this.getWifi = function () {
        return this.wifi;
    }

    this.getWired = function () {
        return this.wired;
    }

    this.toString = function () {
        return this.id + " " + this.name + " " + this.address + " " + this.capacity;
    }
}