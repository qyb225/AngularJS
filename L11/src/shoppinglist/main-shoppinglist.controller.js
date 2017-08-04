angular.module('ShoppingListApp')
.controller('MainListController', MainListController);

MainListController.$inject = ['items'];
function MainListController(items) {
    var mainList = this;
    mainList.items = items;
}