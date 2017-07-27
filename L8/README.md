# Directive

---

## 1. Basic

Directive 允许我们创建自己的html Tag，可使用字符串或者是html文件作为模板，**Runs during compile**.

**app.js**:

```js
app.directive("listItemDescription", function () {
    var ddo = {
        template: "{{ item.name }}: {{ item.cost | currency : '$' : 2 }}"
    };

    return ddo;
});

/*Or html template file*/
app.directive("listItem", function () {
    var ddo = {
        templateUrl: "listItem.html"
    };
    return ddo;
});
```

**listItem.html**:

```html
<li>
    <list-item-description></list-item-description>
</li>
```

**index.html**

```html
<ul>
    <list-item ng-repeat="item in list.items"></list-item>
</ul>
```

---

## 2. Restrict

* **restrict: "AE"**: 可以用作 element 或者 attribute
* **restrict: "E"**: 只可以用作 element
* **restrict: "A"**: 只可以用作 attribute

**app.js**

```js
app.directive('myDirective', function () {
    var ddo = {
        restrict: "AE",
        templateUrl: "template.html",
    };

    return ddo;
});
```

```html
<!-- Element -->
<my-directive></my-directive>

<!-- Attribute -->
<div my-directive></div>

```

---

## 3. scope

**index.html**

```html
<body ng-app="MainApp">
    <div class="container">
        <div ng-controller="ctrl">
            <p>父元素输入：</p>
            <input ng-model="input" type="text" />
            <dir-input></dir-input>
        </div>
    </div>
</body>
```

**app.js**

```js
app.directive('dirInput', function () {
    var ddo = {
        restrict: "E",
        templateUrl: "template.html",
        scope: false //default
    };

    return ddo;
});
```

**template.html**

```html
<div>
    <p>自定义directive：</p>
    <input type="text" ng-model="input" />
    
    <p>结果：{{ input }}</p>
</div>
```

---

### (1) scope: **false**

当 directive 中的 scope 为默认值 **"false"** 时，直接使用父元素里的scope。

![scope = false](./images/scope_false.gif)

---

### (2) scope: **true**

```js
app.directive('dirInput', function () {
    var ddo = {
        restrict: "E",
        templateUrl: "template.html",
        scope: true //change
    };

    return ddo;
});
```

当 directive 中的 scope 为 **true** 时，一开始是绑定在父scope中，但当修改位于自定义指令中的输入框时，子scope就被创建并继承父scope了。之后，修改父scope并不能影响input的值。

![scope = true](./images/scope_true.gif)

---

### (3) scope: **{ }**

创建隔离scope，directive 将无法访问到父scope，传递数据时有两种绑定方式： 
* **=**: 双向绑定
* **@**: 单向绑定

---

**双向绑定 "="**：

**app.js**

```js
app.directive('dirInput', function () {
    var ddo = {
        restrict: "E",
        templateUrl: "template.html",
        scope: {
            input: "=fatherInput" // directive 中的 "input" 双向绑定传给他的 father-input
        }
    };

    return ddo;
});
```

**index.html**

```html
<body ng-app="MainApp">
    <div class="container">
        <div ng-controller="ctrl">
            <p>父元素输入：</p>
            <input ng-model="input" type="text" />
            <dir-input father-input="input"></dir-input>
        </div>
    </div>
</body>
```

![scope = {=}](./images/scope_isolate_twoway.gif)

---

**单向绑定 "@"**：

**app.js**

```js
app.directive('dirInput', function () {
    var ddo = {
        restrict: "E",
        templateUrl: "template.html",
        scope: {
            input: "@fatherInput" // directive 中的 "input" 双向绑定传给他的 father-input
        }
    };

    return ddo;
});
```

注意，与 "=" 绑定不同的是，"@" 绑定只会绑定的是字面字符串而不是model对象，因此是单向的。html中绑定元素应该这样写：

```html
<body ng-app="MainApp">
    <div class="container">
        <div ng-controller="ctrl">
            <p>父元素输入：</p>
            <input ng-model="input" type="text" />
            <dir-input father-input="{{ input }}"></dir-input>
        </div>
    </div>
</body>
```

![scope = {=}](./images/scope_isolate_oneway.gif)