angular.module('Spinner')
.component('loadingSpinner', {
    templateUrl: './src/spinner/loadingSpinner.template.html',
    controller: LoadingSpinnerController
});

LoadingSpinnerController.$inject = ['$rootScope'];
function LoadingSpinnerController($rootScope) {
    var $ctrl = this;
    //$ctrl.displayLoading
    var cancellers = [];

    $ctrl.$onInit = function () {
        var cancel = $rootScope.$on('$stateChangeStart', 
        function (event, toState, toParams, fromState, fromParams, options) {
            $ctrl.displayLoading = true;
        });
        cancellers.push(cancel);

        cancel = $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            $ctrl.displayLoading = false;
        });
        cancellers.push(cancel);

        cancel = $rootScope.$on('$stateChangeError', 
        function (event, toState, toParams, fromState, fromParams, error) {
            $ctrl.displayLoading = false;
        });
        cancellers.push(cancel);
    };



    $ctrl.$onDestroy = function () {
        cancellers.forEach(function (item) {
            item();
        });
    };
}