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
CounterController.$inject = ["$scope", "$timeout"];

function CounterController($scope, $timeout) {
    $scope.onceCounter = 0;
    $scope.counter = 0;
    $scope.delayCounter = 0;
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

    $scope.upDelayCounter = function () {
        /*原生JavaScript setTimeout 调用digest*/
        // setTimeout(function () {
        //     /*不推荐的写法：angular无法得知异常*/
        //     ++$scope.delayCounter;
        //     /*手动进入digest loop做dirty check*/
        //     $scope.$digest();

        //     /*推荐的写法：可以handle 异常，会自动调用$scope.$digest();*/
        //     $scope.$apply(function () {
        //         ++$scope.delayCounter;
        //     });
        // }, 1000);

        /*Angular使用自己的timeout*/
        $timeout(function () {
            ++$scope.delayCounter;
        }, 1000);
    };


    // $scope.$watch("onceCounter", function (oldValue, newValue) {
    //     console.log("Once counter oldValue: ", oldValue);
    //     console.log("Once counter newValue: ", newValue);
    // });

    $scope.$watch(function () {
        console.log("Digest Loop fired: ", ++$scope.loopCounter);
    });
}