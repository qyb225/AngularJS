var app = angular.module("NameCalculator", []);

app.controller("NameCalculatorController", function ($scope) {
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function () {
        $scope.totalValue = calculateValue($scope.name);
    };

    var calculateValue = function (str) {
        var value = 0;
        for (var i = 0; i < str.length; ++i) {
            value += str.charCodeAt(i);
        }
        return value;
    };
});