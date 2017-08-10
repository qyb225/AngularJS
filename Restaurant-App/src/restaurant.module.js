"use strict";

angular.module('RestaurantApp', ['public'])
.config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);