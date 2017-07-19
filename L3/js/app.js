var app = angular.module("MainApp", []);

app.controller("ShoppingListController", ShoppingListController);

ShoppingListController.$inject = ["$scope"];

function ShoppingListController($scope) {
    var shoppingList1 = ["Milk", "Cookies", "Books", "Chocolate", "Juice", "Beer"];
    var shoppingList2 = [
        {
            name: "Milk",
            cost: 2
        },
        {
            name: "Cookies",
            cost: 5
        },
        {
            name: "Books",
            cost: 50
        },
        {
            name: "Chocolate",
            cost: 88
        },
        {
            name: "Juice",
            cost: 10
        },
        {
            name: "Beer",
            cost: 15
        }
    ];

    $scope.shoppingList1 = shoppingList1;
    $scope.shoppingList2 = shoppingList2;

    $scope.addToList = function () {
        var newItem = {
            name: $scope.newItemName,
            cost: $scope.newItemCost
        };
        shoppingList2.push(newItem);

        $scope.newItemName = "";
        $scope.newItemCost = "";
    };
}
