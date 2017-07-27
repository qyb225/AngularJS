var app = angular.module("ShoppingListApp", []);

var ShoppingListDirectiveController = function () {
    var list = this;

    list.cookiesInList = function () {
        for (var i = 0; i < list.items.length; ++i) {
            var name = list.items[i].name;

            if (name.toLowerCase().indexOf("cookie") !== -1) {
                return true;
            }
        }
        return false;
    };
};

app.directive("shoppingList", function () {
    var ddo = {
        scope: {
            items: "=",
            removeFromList: "&removeItem"
        },
        restrict: "E",
        templateUrl: "shoppingList.html",
        controller: ShoppingListDirectiveController,
        controllerAs: "list",
        bindToController: true
    };
    return ddo;
});

var ShoppingListService = function (maxItems) {
    var items = [];

    this.getItems = function () {
        return items;
    };

    this.addItem = function (newItemName, newItemCost) {
        if (maxItems == undefined || items.length < maxItems) {
            items.push({
                name: newItemName,
                cost: newItemCost
            });
        } else {
            throw new Error("Max items " + maxItems + " reached.");
        }
    };

    this.removeItem = function (i) {
        items.splice(i, 1);
    };
};

app.factory("ShoppingListFactory", function () {
    return function (maxItems) {
        return new ShoppingListService(maxItems);
    };
});

app.controller("ShoppingListController1", 
        ["ShoppingListFactory", function(ShoppingListFactory) {
    var list1 = this;
    var serviceInstance = ShoppingListFactory();

    list1.items = serviceInstance.getItems();
    list1.lastRemove = "";

    list1.newItemName = "";
    list1.newItemCost = "";

    list1.addToList = function () {
        try {
            serviceInstance.addItem(list1.newItemName, list1.newItemCost);
            list1.newItemName = "";
            list1.newItemCost = "";
        } catch(error) {
            alert(error.message);
        }
    };

    list1.removeFromList = function (index) {
        list1.lastRemove = list1.items[index].name;
        serviceInstance.removeItem(index);
    };
}]).controller("ShoppingListController2", 
        ["ShoppingListFactory", function(ShoppingListFactory) {
    var list2 = this;
    var serviceInstance = ShoppingListFactory(3);

    list2.items = serviceInstance.getItems();
    
    list2.newItemName = "";
    list2.newItemCost = "";

    list2.addToList = function () {
        try {
            serviceInstance.addItem(list2.newItemName, list2.newItemCost);
            list2.newItemName = "";
            list2.newItemCost = "";
        } catch(error) {
            alert(error.message);
        }
    };

    list2.removeFromList = function (index) {
        serviceInstance.removeItem(index);
    };
}]);
