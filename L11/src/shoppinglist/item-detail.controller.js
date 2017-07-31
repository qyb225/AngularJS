angular.module('ShoppingListApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['item'];
function ItemDetailController(item) {
    var itemDetail = this;
    this.name = item.name;
    this.cost = item.cost;
    this.description = item.description;
}