# Event System

参考：[AngularJS 事件机制](http://blog.csdn.net/u010730126/article/details/51785669)

---

## $scope.$emit

Sends event up the scope chain

```js
var data = {
    message: "some message"
};
$scope.$emit('eventName', data);
```

---

## $scope.$broadcast

Sends event down the scope chain

```js
var data = {
    message: "some message"
};
$scope.$broadcast('eventName', data);
```

---

## $rootScope.$broadcast

Sends event to all scope node

```js
var data = {
    message: "some message"
};
$rootScope.$broadcast('eventName', data);
```

---

## $scope.on

Listen for event.

```js
var deregister = $scope.on('eventName', function(event, data) {
    //Handle event
});

/*Destroy 时退订*/
$ctrl.onDestroy = function () {
    deregister();
};
```