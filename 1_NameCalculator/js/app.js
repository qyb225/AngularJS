var app = angular.module("NameCalculator", []);

app.controller("NameCalculatorController", NCController);
NCController.$inject = ["$scope"];

function NCController($scope) {
    $scope.name = "";
    $scope.totalValue = 0;
    $scope.numOfImg = 0;

    $scope.avatarChange = function () {
        $scope.numOfImg = $scope.numOfImg? 0 : 1;
    };

    $scope.displayNumeric = function () {
        $scope.totalValue = calculateValue($scope.name);
    };

    $scope.getName = function () {
        return "\"" + $scope.name + "\"";
    };

    var calculateValue = function (str) {
        var value = 0;
        for (var i = 0; i < str.length; ++i) {
            value += str.charCodeAt(i);
        }
        return value;
    };
}
