var app = angular.module("MainApp", []);

/*1. Custom Filter*/
app.controller("CustomFilterController", CustomFilterController);
app.filter("loves", function () {
    return function (input) {
        input = input || "";
        return input.replace("likes", "loves");
    };
});
app.filter("truth", function () {
    return function (input, target, replace) {
        input = input || "";
        return input.replace(target, replace);
    };
});

CustomFilterController.$inject = ["$scope", "lovesFilter"];

function CustomFilterController($scope, lovesFilter) {
    $scope.numOfImg = 0;
    $scope.avatarChange = function () {
        $scope.numOfImg = $scope.numOfImg? 0 : 1;
    };

    $scope.sayMessages = function () {
        return "Qubic likes to eat healthy food.";
    };

    $scope.sayLoveMessages = function () {
        var msg = "Qubic likes to eat healthy food.";
        return lovesFilter(msg);
    };
}

/*2. Digest Cycle*/
app.controller("CounterController", CounterController);
CounterController.$inject = ["$scope"];

function CounterController($scope) {
    $scope.onceCounter = 0;
    $scope.counter = 0;
    $scope.name = "Qubic";
    $scope.loopCounter = 0;

    $scope.showNumOfWachers = function () {
        console.log("Number of watchers: ", $scope.$$watchersCount);
    };

    $scope.upCounterOnce = function () {
        $scope.onceCounter = 1;
    };

    $scope.upCounter = function () {
        ++$scope.counter;
    };

    // $scope.$watch("onceCounter", function (oldValue, newValue) {
    //     console.log("Once counter oldValue: ", oldValue);
    //     console.log("Once counter newValue: ", newValue);
    // });

    $scope.$watch(function () {
        console.log("Digest Loop fired: ", ++$scope.loopCounter);
    });
}