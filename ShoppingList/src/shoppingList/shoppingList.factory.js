angular.module('ShoppingListApp')
.factory('ShoppingListFactory', function(){
    return function () {
        return new ShoppingListService();
    };
});

function ShoppingListService() {
    var items = [];

    this.getItems = function () {
        return items;
    };

    this.addItem = function (newName, newCost) {
        items.push({
            name: newName,
            cost: newCost
        });
    };

    this.removeItem = function (index) {
        items.splice(index, 1);
    };
}