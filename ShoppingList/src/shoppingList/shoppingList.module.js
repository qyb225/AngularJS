angular.module('ShoppingListApp', ['Spinner'])
.config(function () {
    console.log("ShoppingListApp config fired!");
})
.run(function () {
    console.log("ShoppingListApp run fired!");
});