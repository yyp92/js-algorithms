# 手写 js 方法

## 实现防抖函数（debounce）
- 防抖函数原理
    - 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
- 适用场景：
    - 按钮提交场景：防止多次提交按钮，只执行最后提交的一次 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似。

```javascript
// func 是用户传入需要防抖的函数
// wait 是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0

  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function() {
    const context = this;
    const args = arguments;

    if (timer) {
        clearTimeout(timer)
    }

    timer = setTimeout(() => {
        func.apply(context, args)
    }, wait)
  }
}
```



##  实现节流函数（throttle）
- 节流函数原理
    - 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
- 适用场景
    - 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
    - 缩放场景：监控浏览器resize
    - 动画场景：避免短时间内多次触发动画引起性能问题

```javascript
// func 是用户传入需要防抖的函数
// wait 是等待时间
const throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0

  return function(...args) {
    // 当前时间
    let now = +new Date()

    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

// test
setInterval(
  throttle(() => {
    console.log(1)
  }, 500),
  1
)
```



## 深克隆（deepclone）
- 简单版
    - 局限性：
        - 他无法实现对函数 、RegExp等特殊对象的克隆
        - 会抛弃对象的constructor,所有的构造函数会指向Object
        - 对象有循环引用,会报错
```javascript
const newObj = JSON.parse(JSON.stringify(oldObj));
```

- 面试版
```javascript
function deepCopy(obj) {
    let result;

    // 判断是否是简单数据类型，
    if (typeof obj == "object") {
        // 复杂数据类型
        result = obj.constructor == Array ? [] : {};

        for (let i in obj) {
            result[i] = typeof obj[i] == "object" ? deepCopy(obj[i]) : obj[i];
        }
    }
    else {
        // 简单数据类型 直接 == 赋值
        result = obj;
    }
    return result;
}
``` 



##  实现一个call
- 将函数设为对象的属性
- 执行 & 删除这个函数
- 指定 this 到函数并传入给定参数执行函数
- 如果不传入参数，默认指向为 window

```javascript
// 模拟 call bar.mycall(null);
// 实现一个call方法：
Function.prototype.myCall = function(context) {
  // 此处没有考虑context非object情况
  context.fn = this;
  let args = [];

  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }

  context.fn(...args);
  let result = context.fn(...args);
  delete context.fn;

  return result;
};

// 更优版
// 实现apply只要把下一行中的...args换成args即可 
Function.prototype.myCall = function(context = window, ...args) {
  let func = this;
  let fn = Symbol("fn");
  context[fn] = func;

  // 重点代码，利用this指向，相当于context.caller(...args)
  let res = context[fn](...args);

  delete context[fn];
  return res;
}
```



## 实现bind
- bind 的实现对比其他两个函数略微地复杂了一点，因为 bind 需要返回一个函数，需要判断一些边界问题，以下是 bind 的实现
    - bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式，我们先来说直接调用的方式
    - 对于直接调用来说，这里选择了 apply 的方式实现，但是对于参数需要注意以下情况：因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 args.concat(...arguments)
    - 最后来说通过 new 的方式，在之前的章节中我们学习过如何判断 this，对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const _this = this
  const args = [...arguments].slice(1)

  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }

    return _this.apply(context, args.concat(...arguments))
  }
}
```



##  模拟new
- new操作符做了这些事
    - 创建一个全新的对象，这个对象的__proto__要指向构造函数的原型对象
    - 执行构造函数
    - 返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象

```javascript
function myNew(fn, ...args) {
    let instance = Object.create(fn.prototype);
    let res = fn.apply(instance, args);
    
    return typeof res === 'object' ? res : instance;
}
```



## 模拟promise
- [JavaScript进阶之手写Promise](https://juejin.im/post/6844903857852514317)

- 简单的
```javascript
const pending = 'PENDING';
const rejecting = 'REJECTED';
const fulfilled = 'FULFILLED';
function Promise1(executor) {
  var that = this;
  that.status = pending;
  that.value = null;
  that.error = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];
  
  function resolve(val) {
    if (that.status === pending) {
      that.status = fulfilled;
      that.value = val;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }
  
  function reject(val) {
    if (that.status === pending) {
      that.status = rejecting;
      that.error = val;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  
  try {
    executor(resolve, reject);
  }
  catch (e) {
    reject(e);
  }
}

Promise1.prototype.then = function (onFulfilled, onRejected) {
  var that = this;
  //为了保证兼容性，then的参数只能是函数，如果不是要防止then的穿透问题
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }

  if (that.status === pending) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  
  if (that.status === fulfilled) {
    onFulfilled(that.value);
  }
  
  if (that.status === rejecting) {
    onRejected(that.error)
  }
};
```

- 复杂的
```javascript
// 最近基本的满足then的链式调用
const pending = 'PENDING';
const rejecting = 'REJECTED';
const fulfilled = 'FULFILLED';

function Promise1(executor) {
  var that = this;
  that.status = pending;
  that.value = null;
  that.error = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];
  
  function resolve(val) {
    if (that.status === pending) {
      that.status = fulfilled;
      that.value = val;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }
  
  function reject(val) {
    if (that.status === pending) {
      that.status = rejecting;
      that.error = val;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  
  try {
    executor(resolve, reject);
  }
  catch (e) {
    reject(e);
  }
}

Promise1.prototype.then = function (onFulfilled, onRejected) {
  var that = this;
  let promise2 = null;
  // 为了保证兼容性，then的参数只能是函数，如果不是要防止then的穿透问题
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }

  if (that.status === pending) {
      return promise = new Promise1((resolve, reject) => {
          that.resolvedCallbacks.push(() => {
              try {
                  const x = onFulfilled(that.value);
                  resolvePromise(promise,x,resolve,reject);
              }
              catch (e) {
                  reject(e);
              }
          });
              
          that.rejectedCallbacks.push(() => {
              try {
                  const x = onRejected(that.error);
              }
              catch (e) {
                  reject(e);
              }
          });
      })
  }	

  // 成功态
  if (that.status === FULFILLED) {
      return promise2 = new Promise((resolve, reject) => {
          setTimeout(() => {
              try {
                  let x = onFulfilled(that.value);
                  resolvePromise(promise2, x, resolve, reject); 
              }
              catch(e) {
                  reject(e); 
              }
          });
      })
  }

  // 失败态
  if (that.status === REJECTED) {
      return promise2 = new Promise((resolve, reject) => {
          setTimeout(() => {
              try {
                  let x = onRejected(that.reason);
                  resolvePromise(promise2, x, resolve, reject);
              }
              catch(e) {
                  reject(e);
              }
          });
      });
  }
};

/**
 * 对resolve 进行改造增强 针对x不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {  
        // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }
    
    // 避免多次调用
    let called = false;

    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof Promise) { // 获得它的终值 继续resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        }
        else { 
            // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 
            x.then(resolve, reject);
        }
    }
    // 如果 x 为对象或者函数
    else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 是否是thenable对象（具有then方法的对象/函数）
        try {
            let then = x.then;

            if (typeof then === 'function') {
                then.call(x, y => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if(called) return;
                    called = true;
                    reject(reason);
                })
            }
            // 说明是一个普通对象/函数
            else {
                resolve(x);
            }
        }
        catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    }
    else {
        resolve(x);
    }
}

```
