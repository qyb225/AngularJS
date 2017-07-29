angular.module('ShoppingListApp')
.service('WeightLossFilterService', WeightLossFilterService);

WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {
    this.checkName = function (name) {
        var deferred = $q.defer();
        $timeout(function () {
            if (name.toLowerCase().indexOf("cookie") === -1) {
                deferred.resolve({ message: "okay" });
            } else {
                deferred.reject({ message: "Stay away from cookies!" })
            }
        }, 2000);
        
        return deferred.promise;
    };
}