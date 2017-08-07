"use strict"
angular.module('RegisterApp', [])
.controller('RegisterController', RegisterController);

function RegisterController() {
    var reg = this;

    reg.$onInit = function () {
        console.log("init");
        reg.completed = false;
    };

    reg.submit = function () {
        reg.completed = true;
    };
}