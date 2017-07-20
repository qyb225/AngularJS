/*filter in JavaScript*/
(function () {
    var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log("numArray: ", numArray);

    var filteredNumArray = numArray.filter(function (value) {
        return value > 5;
    });
    console.log("filteredNumArray: ", filteredNumArray);
})();

(function () {
    var shoppingList = ["Milk", "Cookies", "Chocolate", "Haerbin Beer", "Zhujiang Beer"];
    console.log("ShoppingList: ", shoppingList);

    var searchValue = "Beer";
    var searchedShoppingList = shoppingList.filter(function (value) {
        return value.indexOf(searchValue) != -1;
    });

    console.log("Searched ShoppingList: ", searchedShoppingList);
})();
