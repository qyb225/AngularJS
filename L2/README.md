# Filter, Digest Cycle and Data Binding

---

## 1. Custom Filter

```js
var app = angular.module("mainApp", []);

app.controller("theController", theController);

/* A filter named "custom" */
app.filter("custom", function () {
    return function (input) {
        var output = doSomething(input);
        return output;
    };
});

/* Inject argument named "custom" + "Filter" */
theController.$inject = ["$scope", "customFilter"];

function theController($scope, customFilter) {
    var msg = "some input";
    /* Use customFilter(input); */
    customFilter(msg);
}

```


Add arguments to our filter:

```js
var app = angular.module("mainApp", []);

app.controller("theController", theController);

app.filter("custom", function () {
    /* Add arguments */
    return function (input, arg1) {
        var output = doSomething(input);
        return output;
    };
});

theController.$inject = ["$scope", "customFilter"];

function theController($scope, customFilter) {
    var msg = "some input";
    /* Use customFilter(input, arg1); */
    customFilter(msg, arg1);
}

```

Don't need to add "Filter" in html file

```html
{{ Hello | custom }}

{{ Hello | custom : arg1 }}

{{ Hello | custom | uppercase }}
<!-- $filter("uppercase")(customFilter("Hello")); -->
```