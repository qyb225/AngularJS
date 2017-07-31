angular.module('ShoppingListApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/shoppinglist/templates/home.template.html'
    })
    .state('mainList', {
        url: '/main-list',
        templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
        controller: 'MainListController as mainList',
    })
    .state('itemDetail', {
        url: '/item-detail/{itemId}',
        templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
        controller: 'ItemDetailController as itemDetail',
        resolve: {
            item: ['ShoppingListService', '$stateParams', 
                    function (ShoppingListService, $stateParams) {
                return ShoppingListService.getItems().then(function (items) {
                    return items[$stateParams.itemId];
                });
            }]
        }
    });
}