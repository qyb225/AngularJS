angular.module('Spinner')
.component('loadingSpinner', {
    templateUrl: './src/spinner/loadingSpinner.template.html',
    controller: LoadingSpinnerController
});

LoadingSpinnerController.$inject = ['$scope'];
function LoadingSpinnerController($scope) {
    var $ctrl = this;

    var deregister = $scope.$on('ShoppingList:Processing', function (event, data) {
        $ctrl.displayLoading = data.on;
    });

    $ctrl.$onDestroy = function () {
        deregister();
    };
}