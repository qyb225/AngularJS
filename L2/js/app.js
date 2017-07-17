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