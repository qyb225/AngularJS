var app = angular.module("MainApp", []);

/*1. Custom Service*/
app.controller("ShoppingListAddController", ShoppingListAddController);
app.controller("ShoppingListShowController", ShoppingListShowController);
app.service("ShoppingListService", function () {
    var items = [];

    this.addToList = function (itemName, itemCost) {
        var newItem = {
            name: itemName,
            cost: itemCost
        };
        items.push(newItem);
    };

    this.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };

    this.getItems = function () {
        return items;
    };
});

ShoppingListAddController.$inject = ["ShoppingListService"];
function ShoppingListAddController(ShoppingListService) {
    var itemAdder = this;

    itemAdder.newItemName = "";
    itemAdder.newItemCost = "";

    itemAdder.addToList = function () {
        ShoppingListService.addToList(itemAdder.newItemName, itemAdder.newItemCost);
        itemAdder.newItemName = "";
        itemAdder.newItemCost = "";
    };
}

ShoppingListShowController.$inject = ["ShoppingListService"];
function ShoppingListShowController(ShoppingListService) {
    var showList = this;
    showList.items = ShoppingListService.getItems();

    showList.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
    };
}

/*2. Factory*/
app.factory("ShoppingListFactory", function () {
    return function (maxItems) {
        return new ShoppingListService(maxItems);
    };
});

app.controller("ShoppingListController1",
                 ["ShoppingListFactory", function (ShoppingListFactory) {
    var list1 = this;
    var shoppingList = ShoppingListFactory();

    list1.newItemName = "";
    list1.newItemCost = "";
    list1.items = shoppingList.getItems();

    list1.addToList = function () {
        shoppingList.addToList(list1.newItemName, list1.newItemCost);
        list1.newItemName = "";
        list1.newItemCost = "";
    };

    list1.removeItem = function (index) {
        shoppingList.removeItem(index);
    };
}]);

app.controller("ShoppingListController2", 
                 ["ShoppingListFactory", function (ShoppingListFactory) {
    var list2 = this;
    var shoppingList = ShoppingListFactory(3);
    list2.newItemName = "";
    list2.newItemCost = "";
    list2.items = shoppingList.getItems();

    list2.addToList = function () {
        try {
            shoppingList.addToList(list2.newItemName, list2.newItemCost);
            list2.newItemName = "";
            list2.newItemCost = "";
        } catch(error) {
            list2.errorMessage = error.message;
        } 
    };

    list2.removeItem = function (index) {
        shoppingList.removeItem(index);
        list2.errorMessage = "";
    };
}]);

function ShoppingListService(maxItems) {
    var items = [];

    this.addToList = function (itemName, itemCost) {
        if (maxItems === undefined || items.length < maxItems) {
            var newItem = {
                name: itemName,
                cost: itemCost
            };
            items.push(newItem);
        } else {
            throw new Error("Max items " + maxItems + " reached.");
        }
    };

    this.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };

    this.getItems = function () {
        return items;
    };
}


/*3. Provider*/
app.controller("ProviderController", 
     ["ShoppingListProviderService", function (ShoppingListProviderService) {
    var list = this;

    list.items = ShoppingListProviderService.getItems();
    list.newItemName = "";
    list.newItemCost = "";

    list.addToList = function () {
        try {
            ShoppingListProviderService.addToList(list.newItemName, list.newItemCost);
            list.newItemName = "";
            list.newItemCost = "";
        } catch(error) {
            list.errorMessage = error.message;
        } 
    };

    list.removeItem = function (index) {
        ShoppingListProviderService.removeItem(index);
        list.errorMessage = "";
    };
}]);

app.provider("ShoppingListProviderService", function () {
    var provider = this;

    provider.defaults = {
        maxItems: 10
    };

    provider.$get = function () {
        return new ShoppingListService(provider.defaults.maxItems);
    };
});

app.config(["ShoppingListProviderServiceProvider", 
             function (ShoppingListProviderServiceProvider) {
    ShoppingListProviderServiceProvider.defaults.maxItems = 2;
}]);