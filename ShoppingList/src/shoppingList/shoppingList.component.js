angular.module('ShoppingListApp')
.component('shoppingList', {
    templateUrl: 'src/ShoppingList/shoppingList.template.html',
    bindings: {
        items: '<',
        removeItem: '&'
    },
    controller: ShoppingListComponentController
});

ShoppingListComponentController.$inject = ['WeightLossFilterService', '$q', '$element', '$rootScope'];
function ShoppingListComponentController(WeightLossFilterService, $q, $element, $rootScope) {
    var $ctrl = this;
    var totalItems;

    $ctrl.$onInit = function () {
        totalItems = 0;
    };

    $ctrl.$doCheck = function () {
        if (totalItems !== $ctrl.items.length) {
            totalItems = $ctrl.items.length;

            $rootScope.$broadcast('ShoppingList:Processing', { on: true });
            var promises = [];

            for (var i = 0; i < totalItems; ++i) {
                promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
            }

            $q.all(promises)
            .then(function (res) {
                var warningElem = $element.find('div.warning');
                warningElem.fadeOut(900);
            })
            .catch(function (err) {
                var warningElem = $element.find('div.warning');
                warningElem.fadeIn(900);
            })
            .finally(function () {
                $rootScope.$broadcast('ShoppingList:Processing', { on: false });
            });
        }
    };
}