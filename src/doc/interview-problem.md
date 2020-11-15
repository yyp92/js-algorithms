# js
- [经典面试题](https://juejin.im/post/6847902225423925255)

## 面向对象的特征
多态、继承、封装




## 描述js原型、原型链、闭包
### 原型
- 原型：构造函数的prototype属性指向的对象。

### 原型链
- 每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。

### 闭包
- 闭包就是能够读取其他函数内部变量的函数。
- 用途：
    - 前面提到的可以读取函数内部的变量。
    - 让这些变量的值始终保持在内存中。




## 什么会导致内存泄漏
- 全局变量
- 被遗忘的定时器和回调函数
- DOM引用 （可以用WeakMap）
- 闭包

- [彻底掌握js内存泄漏以及如何避免](https://juejin.im/post/6844903917986267143)



## promise原理，ajax原理
### promise原理 
- https://juejin.im/post/6844904063570542599
- https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/

### ajax原理
- https://juejin.im/post/6844903618764603399
- https://my.oschina.net/u/4263001/blog/3220073



## js里hasOwnProperty和in的区别
### hasOwnProperty
- 判断一个对象属性里是否包含某个key，key为字符串,此方法不会去判断原型
```javascript
// 用法：obj.hasOwnProperty(key) // obj为对象 key为所要判断的字符串
var obj={
    key:123
};
obj.hasOwnProperty('key'); // true
obj.hasOwnProperty('hasOwnProperty'); // false
```

### in
- 判断一个对象属性或原型里面是否包含某个key，key为字符串
```javascript
// 用法：key in obj // obj为对象 key为所要判断的字符串
var obj={
    key:123
};
'key' in obj; // true
'hasOwnProperty' in obj; // true
```




## 什么是CDN
- CDN是Content Delivery Network的简称，即“内容分发网络”的意思。一般我们所说的CDN加速，一般是指网站加速或者用户下载资源加速。
- CDN的原理是尽可能的在各个地方分布机房缓存数据，这样即使我们的根服务器远在国外，在国内的用户也可以通过国内的机房迅速加载资源。
- 因此，我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。并且对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie，平白消耗流量




## promise 规范
- [promiseA+ 翻译](https://juejin.im/post/6844903649852784647)





## js 生成器、迭代器
- [迭代器和生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)

### 迭代器
- 迭代器是一个**特殊的对象**，该对象包含一个next方法，每次调用next方法后返回一个结果对象，结果对象中包含一个value属性和一个done属性。如果一个对象原型上具有Symbol.iterator属性的实现，那么该对象就可以通过for...of进行迭代遍历访问。具有内置迭代对象的数据类型有String、Array、Map、Set、类数组。
- 迭代器可以理解为是一种规范，所有的对象都有next方法，next方法的参数是对象的返回value值，done的Boolean值判断是否继续迭代。迭代器语法也可以自己封装。

### 生成器
- 生成器是一个返回迭代器的函数，是迭代器生成的工具。




## react router 原理（怎么监听到url变化）

## react 如果特别的多的dom，react内部是怎么处理的
- 通过React.lazy()和Suspense来解决（懒加载）。

## webpack 原理（入口是js，怎么会输出到HTML中，如果往HTML中再加入js怎么办）

## git git flow




## 面试
### 有时间看查询和分页组件的实现



## 常见的设计模式
- [常见的设计模式](https://yq.aliyun.com/articles/610216)
- 观察者模式
    - 一个目标对象维持着一系列依赖于它的对象，将有关状态的任何变更自动通知观察者们。在观察者模式中，观察者需要直接订阅目标对象，观察者与目标对象之间有一定的依赖关系。
        - 目标对象（被观察者）：维护一组观察患者，提供管理观察者的方法。
        - 观察者： 提供一个更新接口，用于收到通知时，进行更新
        - 具体目标对象：代表具体的目标对象
        - 具体观察者：代表具体的观察者

- 发布/订阅模式
    - 发布订阅模式可以说是观察这模式的一种变体，一种实现。它使用一个主题/事件通道，介于发布者和订阅者之间，避免了发布者和订阅者之间的依赖关系。

- 工厂模式
    - 工厂函数提供一个通用的接口来创建对象，我们可以指定我们希望创建的对象类型，我们通知工厂函数需要什么类型的对象并提供对应的数据，返回对应的实例。

- 抽象工厂模式
    - 抽象工厂模式，将对象的实现细节抽离出来。适用于需要和多种对象一起工作的场景。

- 单例模式
    - 单例模式限制一个类只有一个实例化对象。
```javascript
class Obj(data) {
  // ....
}
// 利用闭包实现单例模式，确保obj类只有一个实例
function singleton (data) {
  var instance;
  return function () {
    if (!instance) {
      instance = new Obj(data)
    }
    return instance
  }
}
```
 