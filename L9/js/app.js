angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.component('shoppingList', {
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings: {
        items: "<",
        removeFromList: "&removeItem"
    }
});

function ShoppingListComponentController() {
    var $ctrl = this;

    $ctrl.cookieInList = function () {
        for (var i = 0; i < $ctrl.items.length; ++i) {
            var name = $ctrl.items[i].name;

            if (name.toLowerCase().indexOf("cookie") !== -1) {
                return true;
            }
        }
        return false;
    };

    $ctrl.remove = function (i) {
        $ctrl.removeFromList({ index: i });
    };
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