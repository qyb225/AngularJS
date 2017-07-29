angular.module('ShoppingListApp')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
    var list = this;
    var serviceInstance = ShoppingListFactory();

    list.items = serviceInstance.getItems();
    list.newItemName = "";
    list.newItemCost = "";
    list.lastRemove = "";

    list.addToList = function () {
        serviceInstance.addItem(list.newItemName, list.newItemCost);
    };

    list.removeFromList = function (index) {
        serviceInstance.removeItem(index);
    };
}