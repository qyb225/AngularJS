# Directive

---

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