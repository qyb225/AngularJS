var app = angular.module("MainApp", []);

app.service("WeightLossFilterService", ["$q", "$timeout", function ($q, $timeout) {
    this.checkName = function (name) {
        var deferred = $q.defer();
        var result = {
            message: ""
        };

        $timeout(function () {
            if (name.toLowerCase().indexOf("cookie") == -1) {
                result.message = "name okay";
                deferred.resolve(result);
            } else {
                result.message = "Stay away from cookies";
                deferred.reject(result);
            }
        }, 5000);
        return deferred.promise;
    };

    this.checkCost = function (cost) {
        var deferred = $q.defer();
        var result = {
            message: ""
        };

        $timeout(function () {
            if (cost < 1000) {
                deferred.resolve(result);
            } else {
                result.message = "So expensive";
                deferred.reject(result);
            }
        }, 1000);
        return deferred.promise;
    };
}]);

app.service("ShoppingListService", 
            ["$q", "WeightLossFilterService", function ($q, WeightLossFilterService) {
    var shoppingListItems = [];

    this.addItem = function (itemName, itemCost) {
        var checkNamePromise = WeightLossFilterService.checkName(itemName);
        var checkCostPromise = WeightLossFilterService.checkCost(itemCost);
        
        $q.all([checkNamePromise, checkCostPromise])
        .then(function (res) {
            var newItem = {
                name: itemName,
                cost: itemCost
            };
            shoppingListItems.push(newItem);
        })
        .catch(function (errorRes) {
            alert(errorRes.message);
        });
    };

    this.getItems = function () {
        return shoppingListItems;
    };
}]);

app.controller("ShoppingListController", ["ShoppingListService", function (ShoppingListService) {
    var list = this;
    list.newItemName = "";
    list.newItemCost = "";

    list.items = ShoppingListService.getItems();

    list.addToList = function () {
        ShoppingListService.addItem(list.newItemName, list.newItemCost);
    };
}]);

/*ShoppingListService*/
/*1. just like callbacks*/
// this.addItem = function (itemName, itemCost) {
//     var checkNamePromise = WeightLossFilterService.checkName(itemName);
//     checkNamePromise.then(function (res) {
//         var checkCostPromise = WeightLossFilterService.checkCost(itemCost);
//         checkCostPromise.then(function (res) {
//             var newItem = {
//                 name: itemName,
//                 cost: itemCost
//             };
//             shoppingListItems.push(newItem);
//         }, function (errorRes) {
//             alert(errorRes.message);
//         });
//     }, function (errorRes) {
//         alert(errorRes.message);
//     });
// };

/*2. Better code styles but is not parallel*/
// this.addItem = function (itemName, itemCost) {
//     var promise = WeightLossFilterService.checkName(itemName);

//     promise
//     .then(function (res) {
//         return WeightLossFilterService.checkCost(itemCost);
//     })
//     .then(function (res) {
//         var newItem = {
//             name: itemName,
//             cost: itemCost
//         };
//         shoppingListItems.push(newItem);
//     })
//     .catch(function (errorRes) {
//         alert(errorRes.message);
//     });
// };
