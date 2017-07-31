angular.module('ShoppingListApp')
.controller('MainListController', MainListController);

MainListController.$inject = ['ShoppingListService'];
function MainListController(ShoppingListService) {
    var mainList = this;
    ShoppingListService.getItems().then(function (items) {
        mainList.items = items;
    });
}