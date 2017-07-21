/*1. prototype chain inherit*/
(function () {
    console.log("1. prototype chain inherit");
    var parent = {
        value: "Parent value",
        obj: {
            objValue: "Parent objValue"
        },
        walk: function () {
            console.log("Parent walk");
        }
    };

    var child = Object.create(parent);

    console.log("Child value: ", child.value);
    console.log("Child objValue: ", child.obj.objValue);
    console.log("Parent: ", parent);
    console.log("Child: ", child);
    console.log();

    child.value = "Child value";
    /*Parent objValue change, too.*/
    child.obj.objValue = "Child objValue";

    console.log("Child value: ", child.value);
    console.log("Child objValue: ", child.obj.objValue);
    console.log("Parent value: ", parent.value);
    console.log("Parent objValue: ", parent.obj.objValue);
    console.log("Parent: ", parent);
    console.log("Child: ", child);
    console.log("child.obj === parent.obj? ", child.obj === parent.obj);

    var grandChild = Object.create(child);

    grandChild.walk();
    console.log();
})();

/*2. Constructor*/
(function () {
    console.log("2. constructor and inherit");
    /*Constructor*/
    var Parent = function (name) {
        this.name = name;
    }
    Parent.prototype.walk = function () {
        console.log("Parent is walking.");
    };
    Parent.prototype.sayHello = function () {
        console.log("Hi, I'm ", this.name);
    };
    /*Invoked by itself*/
    var father = new Parent("Sky");
    console.log("Father: ", father);

    /*Invoked by window, so 'this.name = name;' add attributes to window*/
    var mother = Parent("Ground");

    console.log(father.name);

    /*Error: */
    /*console.log(mother.name);*/
    father.walk();
    father.sayHello();

    var Child = function(name, age) {
        Parent.call(this, name);
        this.age = age;
    };

    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.walk = function () {
        console.log("Child is walking.");
    };

    var child = new Child("Tom", 8);
    console.log("child: ", child);
    child.walk();
    child.sayHello();
})();
