angular.module('ShoppingListApp')
.service('ShoppingListService', ShoppingListService);

ShoppingListService.$inject('$q', '$timeout');
function ShoppingListService($q, $timeout) {
    var items = [];
    items.push({
        name: "candy",
        cost: 5,
        description: "Yummy!"
    });
    items.push({
        name: "iPhone",
        cost: 699,
        description: "Apple product"
    });
    items.push({
        name: "Macbook Pro",
        cost: 1599,
        description: 'Apple PC'
    });

    this.getItems = function () {
        var deferred = $q.defer();
        $timeout(function () {
            deferred.resolve(items)
        }, 1000);
        return deferred.promise;
    };
}