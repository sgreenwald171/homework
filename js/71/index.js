function Vehicle(color) {
  this.color = color;
}

Vehicle.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`vehicle is now going at speed ${this.speed}`);
};

Vehicle.prototype.print = function () {
  console.log(`${this.color} vehicle is going ${this.speed}`);
};

const myCar = new Vehicle('red');
console.log(myCar);
myCar.go(120);
myCar.print();

function Plane(color) {
  Vehicle.call(this, color);
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`Plane is now flying at speed ${this.speed}`);
};

const myPlane = new Plane('black');
console.log(myPlane);
myPlane.go(180);
myPlane.print();