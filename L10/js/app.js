angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService)
.component('shoppingList', {
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings: {
        items: "<",
        removeFromList: "&removeItem"
    }
})
.component('loadingSpinner', {
    templateUrl: 'spinner.html',
    controller: SpinnerController
});

SpinnerController.$inject = ['$scope'];
function SpinnerController($scope) {
    var $ctrl = this;

    /*$on() 返回一个函数，这个函数就是退订事件的方法*/
    var cancelListener = $scope.$on('shoppingList:processing', function (event, data) {
        $ctrl.showSpinner = data.on;
    });

    $ctrl.onDestory = function () {
        cancelListener();
    };
}

WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {
    this.checkName = function (name) {
        var deferred = $q.defer();
        var result = {
            message: "okay"
        };

        $timeout(function () {
            if (name.toLowerCase().indexOf("cookie") === -1) {
                deferred.resolve(result);
            } else {
                result.message = "Stay away from cookies!";
                deferred.reject(result);
            }
        }, 2000);

        return deferred.promise;
    };

    this.checkCost = function (cost) {
        var deferred = $q.defer();
        var result = {
            message: "okay"
        };

        $timeout(function () {
            if (cost < 1000) {
                result.message = "Too expensive!";
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        }, 2000);

        return deferred.promise;
    };
}

ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {
    var $ctrl = this;
    var totalItem;

    // $ctrl.cookieInList = function () {
    //     for (var i = 0; i < $ctrl.items.length; ++i) {
    //         var name = $ctrl.items[i].name;

    //         if (name.toLowerCase().indexOf("cookie") !== -1) {
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    $ctrl.remove = function (i) {
        $ctrl.removeFromList({ index: i });
    };

    $ctrl.$onInit = function () {
        totalItem = 0;
        // console.log("We are in $onInit();");
    };

    $ctrl.$doCheck = function () {
        if (totalItem != $ctrl.items.length) {
            totalItem = $ctrl.items.length;

            $rootScope.$broadcast('shoppingList:processing', { on: true });
            var promises = [];
            for (var i = 0; i < $ctrl.items.length; ++i) {
                promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
            }

            $q.all(promises)
            .then(function (res) {
                var warningElem = $element.find('div.delete');
                warningElem.fadeOut(900);
            })
            .catch(function (error) {
                var warningElem = $element.find('div.delete');
                warningElem.fadeIn(900);
            })
            .finally(function () {
                $rootScope.$broadcast('shoppingList:processing', { on: false });
            });
        }
    }
}

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
    var list = this;

    list.newItemName = "";
    list.newItemCost = "";
    list.lastRemove = "";

    list.items = ShoppingListService.getItems();

    list.addToList = function () {
        ShoppingListService.addItem(list.newItemName, list.newItemCost);
    };

    list.removeFromList = function (index) {
        list.lastRemove = list.items[index].name;
        ShoppingListService.removeItem(index);
    };
}

function ShoppingListService() {
    var items = [];

    this.getItems = function () {
        return items;
    };

    this.addItem = function (itemName, itemCost) {
        items.push({
            name: itemName,
            cost: itemCost
        });
    };

    this.removeItem = function (index) {
        items.splice(index, 1);
    };
}