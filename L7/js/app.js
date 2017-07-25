var app = angular.module("MenuApp", []);
app.constant("ApiBasePath", "http://davids-restaurant.herokuapp.com");

app.controller("MenuCategoriesController", 
                ["MenuCategoriesService", function (MenuCategoriesService) {
    var menu = this;
    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function (res) {
        menu.categories = res.data;
    }).catch(function (error) {
        console.log("Cannot get categories");
    });

    menu.logMenuItems = function (shortItemName) {
        var promise = MenuCategoriesService.getMenuForCategory(shortItemName);

        promise.then(function (res) {
            console.log(res.data);
        }).catch(function (error) {
            console.log(error);
        });
    };
}]);

app.service("MenuCategoriesService", 
            ["$http", "ApiBasePath", function ($http, ApiBasePath) {
    this.getMenuCategories = function () {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });

        return response;
    };

    this.getMenuForCategory = function (shortItemName) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: shortItemName
            }
        });

        return response;
    };
}]);
