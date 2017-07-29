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

ShoppingListComponentController.$inject = ['$scope', '$element'];
function ShoppingListComponentController($scope, $element) {
    var $ctrl = this;
    var totalItem;

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

    $ctrl.$onInit = function () {
        totalItem = 0;
        // console.log("We are in $onInit();");
    };

    $ctrl.$doCheck = function () {
        if (totalItem != $ctrl.items.length) {
            totalItem = $ctrl.items.length;
            console.log("List changes");
            if ($ctrl.cookieInList()) {
                console.log("Find COOKIE");
                var warningElem = $element.find('div.delete');
                warningElem.fadeIn(900);
            } else {
                console.log("No cookies");
                var warningElem = $element.find('div.delete');
                warningElem.fadeOut(900);
            }
        }
    }

    // $ctrl.$postLink = function () {
    //     $scope.$watch('$ctrl.cookieInList()', function (newValue, oldValue) {
    //         if (newValue) {
    //             var warningElem = $element.find('div.delete');
    //             warningElem.fadeIn(900);
    //         } else {
    //             var warningElem = $element.find('div.delete');
    //             warningElem.fadeOut(900);
    //         }
    //     });
    // };
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