# Promise

---

## 小故事：

**一天早晨，爹对儿子说：“宝儿，出去看看天气如何！”**

每个星期天的早晨，爹都叫小宝拿着超级望远镜去家附近最高的山头上看看天气走势如何，小宝说没问题，我们可以认为小宝在离开家的时候给了他爹一个promise。


这时候，他爹就想了，如果明天艳阳高照，他就准备去钓鱼，如果天实在不行，就作罢，如果小宝对预报明天的天气也没底，他就在家宅一天哪也不去。

大概过了半小时，小宝回来了。每周的结果不尽相同：

**A计划 ：天气晴朗**

小宝不辱使命，说外面阳光明媚，万里无云，这个promise was resolved（小宝信守承诺），爹就可以收拾行装，钓鱼去了。

![](./images/weather_good.jpg)

**B计划： 小宝日观天象，阴转小雨的节奏**

小宝依然不辱使命，但是天公不作美，promise was resolved，但是孩儿他爹觉得还是搁家呆着吧。

![](./images/weather_bad.jpg)

**C计划：天象诡谲，小宝无法做出天气走势判断**

小宝败兴而归，云雾重重，遮蔽了视线，不敢妄言天气走势，小宝走的时候立下承诺说要给他爹预报天气，但是没有成功，我们说promise was rejected！孩儿他爹决定小心驶得万年船，还是在家吧。

![](./images/weather_unknown.jpg)

----

## 如何用代码描述上述过程？

首先，son 这个service里，儿子做出promise。在AngularJs中，我们使用 **\$q.defer()** 创建promise

```js
app.service("SonService", ["$q", function ($q) {
    this.getWeather = function () {
        var deferred = $q.defer();
        var result = {
            message: ""
        };
        
        /*如果天气晴朗，promise resolved*/
        if (weather == "good") {
            result.message = "good";
            deferred.resolve(result);
        }
        /*如果天气不好，promise resolved，只不过告诉father天气不好*/
        else if (weather == "bad") {
            result.message = "bad";
            deferred.resolve(result);
        }
        /*如果看不清楚天气，promise rejected*/
        else {
            result.message = "weather unknown";
            deferred.reject(result);
        }

        /*返回promise*/
        return deferred.promise;
    };
}]);
```

在father的service里，得到son 的promise，做出判断

```js
app.service("FatherService", ["SonService", function (SonService) {
    var promise = SonService.getWeather();

    promise.then(function (res) {
        if (res.message == "good") {
            goFishing();
        } else {
            stayAtHome();
        }
    }).catch(function (error) {
        stayAtHome();
    });
}]);
```

当然下面的写法也等价：

```js
app.service("FatherService", ["SonService", function (SonService) {
    var promise = SonService.getWeather();

    promise.then(function (res) {
        if (res.message == "good") {
            goFishing();
        } else {
            stayAtHome();
        }
    }, function (error) {
        stayAtHome();
    });
}]);
```

### Q. 如果有两个promise呢？

1. 需要先执行第一个，第一个成功后再执行第二个

```js
var promise1 = getPromise1();
promise1.then(function (res) {
    console.log("Promise1 resolved!");

    var promise2 = getPromise2();

    promise2.then(function (res) {
        console.log("Promise2 resolved!");
    }, function (error) {
        console.log("Promise2 rejected!");
    });
}, function (error) {
    console.log("Promise1 rejected!");
});
```

风格有点乱，所以我们采用下面的写法：

```js
var promise1 = getPromise1();

promise1
.then(function (res) {
    console.log("Promise1 resolved!");
    return getPromise2();
})
.then(function (res) {
    console.log("Promise2 resolved!");
})
.catch(function (error) {
    console.log(error.message);
});
```

2. 两个promise**并行**执行

使用 **\$q.all()**

```js
var promise1 = getPromise1();
var promise2 = getPromise2();

$q.all([promise1, promise2])
.then(function (res) {
    console.log("P1 and P2 are both resolved!");
})
.catch(function (error) {
    console.log(error.message); 
});

```