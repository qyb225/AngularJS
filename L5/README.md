#  Service and Factory

---

## 1. Service

用途：不同 controller 之间交换数据，完成逻辑。 单例模式

语法：

```js
/*注册service*/
app.service("Service", function () {
    var innerValue = "xxx";
    
    /*逻辑函数*/
    this.someLogic = function () {
         doSomething(innerValue);
    };
    
    /*共享数据*/
    this.getData = function () {
        return innerValue;
    };
});

/*
 * 注入controller，
 * 单例Service可以注入不同controller实现共享
 */
app.controller("Controller", ["Service", function (Service) {
    var viewModel = this;
    viewModel.data = Service.getData();
    
    viewModel.anotherLogic = function () {
        Service.someLogic();
    };
}]);
```

---

## 2. Factory

Factory提供不同的 service 实例（产品），每个实例都是独立互不影响的。

```js
/*第一种，Factory 为之后函数实例*/
app.factory("Factory1", function () {
    return function (arg) {
        return new Service(arg);
    };
});

/*第二种，可返回Object*/
app.factory("Factory2", function () {
    return function (arg) {
        return {
            getService1: function () {
                return new Service1(arg);
            },
            getService2: function () {
                return new Service2(arg);
            }
        }；
    };
});
```
Factory 会注册进入controller，Factory即时注册 function的一个实例。service大致如下： 



```js
function Service(arg) {
    var innerValue = "xxx";
    
    /*逻辑函数*/
    this.someLogic = function () {
         doSomething(innerValue);
    };
    
    /*数据*/
    this.getData = function () {
        return innerValue;
    };
}
```

注入controller

```js
app.controller("Controller1", ["Factory1", function (Factory1) {
    var viewModel = this;
    var service = Factory1();
    viewModel.data = service.getData();
    
    viewModel.anotherLogic = function () {
        service.someLogic();
    };
}]);

app.controller("Controller2", ["Factory2", function (Factory2) {
    var viewModel = this;
    var service = Factory2.getService1();
    viewModel.data = service.getData();
    
    viewModel.anotherLogic = function () {
        service.someLogic();
    };
}]);

```