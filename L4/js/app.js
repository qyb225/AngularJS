var app = angular.module("MainApp", []);

/*1. Controller*/
app
.controller("ParentController1", ParentController1)
.controller("ChildController1", ChildController1);

ParentController1.$inject = ["$scope"];

function ParentController1($scope) {
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;
}

ChildController1.$inject = ["$scope"];

function ChildController1($scope) {
    console.log("Child $scope.parentValue: ", $scope.parentValue);
    console.log("Child $scope: ", $scope);

    $scope.parentValue = 5;
    console.log("** Change $scope.parentValue = 5 **");
    console.log("Child $scope.parentValue: ", $scope.parentValue);
    console.log("Child $scope: ", $scope);

    console.log("Child $scope.pc.parentValue: ", $scope.pc.parentValue);
    $scope.pc.parentValue = 5;
    console.log("** Change $scope.pc.parentValue = 5 **");
    console.log("Child $scope.pc.parentValue: ", $scope.pc.parentValue);
    console.log("Child $scope: ", $scope);
}

/*Controller As Syntax*/
app
.controller("ParentController2", ParentController2)
.controller("ChildController2", ChildController2);

//ParentController2.$inject = ["$scope"];

function ParentController2() {
    var parentViewModel = this;
    parentViewModel.value = 1;
}

ChildController2.$inject = ["$scope"];

function ChildController2($scope) {
    var childViewModel = this;
    childViewModel.value = 5;
    console.log("Child2 $scope: ", $scope);
}