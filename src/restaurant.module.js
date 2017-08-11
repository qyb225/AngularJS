"use strict";

angular.module('RestaurantApp', ['public'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}