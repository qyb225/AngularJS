# Ajax with $http

## API in app.js

* http://davids-restaurant.herokuapp.com/categories.json
* http://davids-restaurant.herokuapp.com/menu_items.json
* http://davids-restaurant.herokuapp.com/menu_items.json?category=B

---

## Ajax 请求：

$http 返回一个promise，接受后response.data为返回的内容。

```js
/*发送Ajax请求*/
var getNetworkData = function () {
    return $http({
        method: "GET",
        url: (ApiBasePath + "/api"),
        params: {
            prop1: "prop1"
        }
    });
};

/*接受数据*/
var promise = getNetworkData();
promise.then(function (res) {
    console.log(res.data);
}).catch(function (error) {
    console.log("error");
});
```