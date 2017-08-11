"use strict";

angular.module('common')
.component('loading', {
    template: '<img src="images/spinner.svg" ng-if="$ctrl.show" />',
    controller: loadingController
});

loadingController.$inject = ['$rootScope'];
function loadingController($rootScope) {
    var $ctrl = this;
    var listener;

    $ctrl.$onInit = function () {
        $ctrl.show = false;
        listener = $rootScope.$on('spinner:active', function (event, data) {
            $ctrl.show = data.on;
        });
    };

    $ctrl.$onDestroy = function () {
        listener();
    };
}
