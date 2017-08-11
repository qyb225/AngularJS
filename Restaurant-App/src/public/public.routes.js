"use strict";

angular.module('public')
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('public', {
        abstract: true,
        templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
        url: '/',
        templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
        url: '/menu',
        templateUrl: 'src/public/menu/menu.html',
        controller: 'MenuController',
        controllerAs: 'menuCtrl',
        resolve: {
            menuCategories: ['MenuService', function (MenuService) {
                return MenuService.getCategories();
            }]
        }
    });
}]);