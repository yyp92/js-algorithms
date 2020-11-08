*这篇博客总结的常见面试题比较新[点击进入](https://www.codercto.com/a/118040.html)*

#### hooks 的了解 已经常用的方式
[博客](https://juejin.im/post/6844903760028762125)

[官方文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)

#### react 中的 setState为什么异步？能不能同步？什么时候异步？什么时候同步？

#### react函数式组件的好处

[博客](https://segmentfault.com/a/1190000006180667)

#### react 组件懒加载
##### 通过react lazy 和 Suspense
组件中
```
import React, {lazy, Suspense} from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```
路由中
```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const UserManage = lazy(() => import('./routes/UserManage'));
const AssetManage = lazy(() => import('./routes/AssetManage'));
const AttendanceManage = lazy(() => import('./routes/AttendanceManage'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/userManage" component={UserManage}/>
        <Route path="/assetManage" component={AssetManage}/>
        <Route path="/attendanceManage" component={AttendanceManage}/>
      </Switch>
    </Suspense>
  </Router>
)
```
##### 通过 require.ensure()
```
 {
    path: 'handover-contract-apply',
    getComponent(location, callback) {
        require.ensure([], () => {
            let Page = require('./HandoverPage/ApplyManage').Apply;
            callback(null, Page);
        })
    }
},
```

#### react context 使用
```
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

[官方文档](https://zh-hans.reactjs.org/docs/context.html)

#### react 兄弟组件传值
1. 状态提升
2. 用react的 context 将状态注入到父组件
3. 通过状态管理工具

#### react  高阶组件 和 render-props

#### react 性能提升
##### 避免调停
1. react 组件中 不要在render中绑定方法this, 直接在构造函数中绑定this
```
constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
}
handleClick() {
    console.log('点击')
}
render() {
    return (
        <div>
            <button onclick={this.handleClick}></button>
            <button onclick={this.handleClick.bind(this)}></button>
            <button onclick={() => this.handleClick()}></button>
        </div>
    )
}
```
第一种，构造函数每一次渲染的时候只会执行一遍；
第二种方法，在每次render()的时候都会重新执行一遍函数；
第三种方法的话，每一次render()的时候，都会生成一个新的箭头函数，即使两个箭头函数的内容是一样的。

2. 当一个组件的 props 或 state 变更，React 会将最新返回的元素与之前渲染的元素进行对比，以此决定是否有必要更新真实的 DOM。当它们不相同时，React 会更新该 DOM。

即使 React 只更新改变了的 DOM 节点，重新渲染仍然花费了一些时间。在大部分情况下它并不是问题，不过如果它已经慢到让人注意了，你可以通过覆盖生命周期方法 shouldComponentUpdate 来进行提速。该方法会在重新渲染前被触发。其默认实现总是返回 true，让 React 执行更新：
```
shouldComponentUpdate(nextProps, nextState) {
 // 进行比较判断是否更新
  return true;
}

<!--在大部分情况下，你可以继承 React.PureComponent 以代替手写 shouldComponentUpdate()。它用当前与之前 props 和 state 的浅比较覆写了 shouldComponentUpdate() 的实现。-->
```
3. 设置列表的唯一的key

###### 虚拟化长列表
如果你的应用渲染了长列表（上百甚至上千的数据），我们推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM 节点的数量。

react-window 和 react-virtualized 是热门的虚拟滚动库。 它们提供了多种可复用的组件，用于展示列表、网格和表格数据。 如果你想要一些针对你的应用做定制优化，你也可以创建你自己的虚拟滚动组件，就像 Twitter 所做的。

#### react高阶组件作用

#### 什么是纯函数
1. 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

2. 该函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变（mutation）。


#### 垃圾回收机制
1，标记清除法：

当变量进入执行环境时，标记这个变量为“进入环境”；

当变量离开环境时，标记为“离开环境”；

垃圾回收器并不是每时每刻都在工作，每隔一段时间工作一次；

垃圾回收器运行时，给每个变量都加上标记，然后去掉环境中的变量，以及被环境中变量引用的变量的标记。

然后，这时候，剩下的所有的被标记的变量，都是要被清除回收的变量。

最后，垃圾收集器销毁这些变量的值，收回占用的内存空间。

2，引用计数法

跟踪每个值被引用的次数。

当声明了一个变量，把一个引用类型的值复制给这个变量时，这个值的引用次数就是1；

如果这个变量又重新引用了另一个值，那么原先的值引用次数就减1；

当一个值的（被）引用次数变成0时，就说明不再也没有办法再引用这个值了。因此就可以将他的内存释放。

垃圾收集器在下次运行时，就会回收释放掉这种引用次数为0的值的内存。

#### 什么会导致内存泄漏
1. 全局变量
2. 被遗忘的定时器和回调函数
3. DOM引用 （可以用WeakMap）
4. 闭包
[彻底掌握js内存泄漏以及如何避免](https://juejin.im/post/6844903917986267143)

####  Set 和 WeakSet 区别 （Map 和 WeakMap）
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

这些特点同样适用于本章后面要介绍的 WeakMap 结构

##### 用处
WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
[es6 入门](https://es6.ruanyifeng.com/#docs/set-map)
#### webpack常用的 loader 和 plugin
##### lodaer
- file-loader：文件加载。
- url-loader：文件加载，可以设置阈值，小于时把文件 base64 编码。
- image-loader：加载并压缩图片。
- json-loader：webpack 默认包含。
- babel-loader：ES6+ 转成 ES5。
- ts-loader：ts转化为js。
- awesome-typescript-loader：将 ts 转换为 js，性能更好。
- css-loader：处理 @import 和 url 这样的外部资源。
- style-loader：在 head 创建 style 标签把样式插入。
- postcss-loader：扩展 css 语法，使用 postcss 各种插件 autoprefixer，cssnext，cssnano。
- eslint-loader,tslint-loader：规范代码。
- vue-loader：加载 vue 单文件组件。
- i18n-loader：国际化。
- cache-loader：性能开销大的 loader 前添加，将结果缓存到磁盘。
- svg-inline-loader：压缩后的 svg 注入代码。
- source-map-loader：加载 source Map 文件，方便调试。
- expose-loader：暴露对象为全局变量。
- import-loader，export-loader：可以向模块注入变量或者提供导出模块功能。
- raw-loader：可以将文件以字符串形式返回。
- 校验测试：mocha-loader，jshint-loader，eslint-loader等。
##### plugin
- ignore-plugin：忽略文件。
uglifyjs-webpack-plugin：webpack4之前，压缩和混淆代码，不支持 ES6 压缩。
- terser-webpack-plugin：webpack4，压缩和混淆代码，支持 ES6 压缩。
- webpack-parallel-uglify-plugin：多进程执行代码压缩，提升构建速度。
- mini-css-extract-plugin：分离样式文件，css 提取为独立文件，支持按需加载。
- serviceworker-webpack-plugin：为网页添加离线缓存功能。
- clean-webpack-plugin：目录清理。
- speed-measure-webpack-plugin：可以看见每个 loader 和 plugin 执行耗时。
- ProvidePlugin：自动加载模块，代替 require 和 import。
- html-webpack-plugin：可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件。
- extract-text-webpack-plugin：将 JS 文件中引用的样式单例抽离成 css。
- DefinePlugin：编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
- HosModuleReplacementPlugin：热更新。
- DllPlugin 和 DllReferencePlugin 相互配合，前者第三方包的构建，只构建业务代码。
- optimize-css-assets-webpack-plugin：不同组件中重复的 css 可以快速去重。
- webpack-bundle-analyzer：一个 webpack 的 bundle 文件分析工具。
- compression-webpack-plugin：生产环境可采用 gzip 压缩 JS 和 CSS。
- happypack：通过多进程模型，来加速代码构建。
##### 相关链接
[博客](https://blog.csdn.net/MoLvSHan/article/details/105702643)
[官网](https://www.webpackjs.com/plugins/define-plugin/)
#### BFC
##### BFC概念
BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
##### 布局规则
- 内部的Box会在垂直方向，一个接一个地放置。

- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

- BFC的区域不会与float box重叠。

- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

- 计算BFC的高度时，浮动元素也参与计算
##### 创建BFC
- body 根元素
- float的值不是none。
- position的值不是static或者relative。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不是visible

##### BFC的作用
- 利用BFC避免margin重叠
  现象：
  1. 相邻的两个div margin重叠
  因为两个div属于同一个BFC，就会发生margin重叠，解决办法让这两个div不在同一个BFC中，可以将其中一个或两个div用别的div嵌套并将嵌套的div设置成BFC
  2. 一个div嵌套另一个div 这两个div之间magin重叠，还是因为这两个div在同一个BFC中，即使他们的父元素没有设置，根元素body也是一个BFC的box,解决办法就是让这两个div在不同的BFC中，将其中一个div设置成BFC
  
  原理：Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 清除浮动
  原理： 计算BFC的高度时，浮动元素也参与计算。
- 自适应两栏布局
  原理： 原理: BFC的区域不会与float box重叠。

##### 总结
*BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。*
因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。
##### 参考文档
[什么是BFC](https://blog.csdn.net/sinat_36422236/article/details/88763187)

#### 标准盒模型和IE和模型 以及怎么转换
可以通过 box-sizing:content-box(标准盒模型)/border-box(IE盒模型) 进行设置
可以看到，在标准盒模型下，width和height是内容区域即content的width和height。而盒子总宽度为

在标准模式下，一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)

而IE盒模型或怪异盒模型显而易见的区别就是，width和height除了content区域外，还包含padding和border。盒子的总宽度为

一个块的总宽度= width + margin(左右)（即width已经包含了padding和border值）
*[两种模型应用场景](https://www.cnblogs.com/yky-iris/p/7719895.html)*


#### e.getAttribute(propName)和e.propName的区别
1. getAttribute可以获取到自己添加上去的属性，propName只能获取DOM自带属性的值
2. 一些attribute和property不是一一对应如：form控件中对应的是defaultValue，修改或设置value property修改的是控件当前值，setAttribute修改value属性不会改变value property
一些attribute和property不是一一对应如
```
form控件中<input id="input" value="hello"/>  
document.getElementById("input").getAttribute("value")    //hellow
document.getElementById("input").value    //""  用户输入的值  
```



#### mobx的原理 和方法

extendObservable该API会可以为对象新增加observal属性。
```
const Mobx = require("mobx");
const { observable, autorun, computed, extendObservable } = Mobx;
var numbers = observable({ a: 1, b: 2 });
extendObservable(numbers, { c: 1 });
autorun(() => console.log(numbers.c));
numbers.c = 3;

// 1

// 3
```
参考链接

[官网](https://cn.mobx.js.org/refguide/observable.html)
[博客](https://www.jianshu.com/p/2de14ea46d26)
#### 页面报错上报
1. try catch
2. wiondow.onError()
3. window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中。 这对于调试回退错误处理非常有用。

[这篇博客比较全面](https://www.jianshu.com/p/22a0f4453c85)

#### flex
[阮一峰Flex布局教程语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰Flex布局教程实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

#### grid
[阮一峰Grid网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

#### 算法

##### 二分法


#### SameSite 谷歌浏览器80对其设置的默认值 导致跨域页面携带cookie失效

Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险
它可以设置三个值。Strict、Lax、None
- Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
- Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
- Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
- 

#### 获取dom到body左侧和顶部的距离-getBoundingClientRect
```
let domToTop = dom.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
let domToLeft = dom.getBoundingClientRect().left // dom 的左边到视口左边的距离
let domToBottom = dom.getBoundingClientRect().bottom // dom 的底边到视口顶部的距离
let domToRight = dom.getBoundingClientRect().right // dom 的右边到视口左边的距离
```

#### 获取窗体的各种高度
[这篇博客比较全](https://www.cnblogs.com/wangkongming/p/6195903.html)


#### 左侧固定宽右侧自适应
1. 左侧浮动，右侧margin
2. 左侧绝对定位，右侧margin
3. 左侧浮动，右侧overflow: hiddin(形成BFC)
4. 左侧浮动，右侧浮动并且calc计算宽度 ||  左右设置inline-block 并且calc计算宽度
5. flex布局，左侧为flex1, 右侧auto
6. 左右侧box设置table, 左侧display: table-cell并设置宽度，右侧auto

[这篇文章比较全](https://www.cnblogs.com/vicky123/p/8866548.html)


#### Promise的实现

#### event loop
[js event面试题](https://www.jianshu.com/p/5950d677eb2e)
[node和页面js事件池不同](https://www.cnblogs.com/cangqinglang/p/8967268.html)
#### 移动端性能提升
[博客有点全](https://blog.csdn.net/alex_hou0814/article/details/91421331)

#### webpack编译流程
Webpack的运行流程是一个串行的过程，从启动到结束依次执行以下流程：

1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
2. 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

[这篇博客不错](https://juejin.im/post/6844903935828819981)

#### 设计模式 种类 简单描述

#### 实现 sort

#### CDN是什么

#### 前端新技术 怎么学习前端

#### 未来发展方向

#### 浏览器缓存
cache-control中的no-cache与no-store区别

no-cache: 数据内容不能被缓存,每次请求都重新访问服务器, 若有max-age, 则缓存期间不访问服务器.

no-store 则是不进行任何数据的缓存

[这个博客不错](https://blog.csdn.net/Ed7zgeE9X/article/details/105445197?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduend~default-1-105445197.nonecase&utm_term=%E5%89%8D%E7%AB%AF%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%80%8E%E4%B9%88%E8%AE%BE%E7%BD%AE&spm=1000.2123.3001.4430)

#### WEBPACK 几种hash值用法
webpack 给我们提供了三种哈希值计算方式，分别是 hash、chunkhash 和 contenthash。那么这三者有什么区别呢？

hash：跟整个项目的构建相关，构建生成的文件hash值都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。

chunkhash：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。

contenthash：由文件内容产生的hash值，内容不同产生的contenthash值也不一样。

#### 浏览器同源策略

#### viewport

#### WEBPACK JS 抽取打包
[SplitChunksPlugin和DllPlugin区别](https://kazehaiya.github.io/2019/05/23/webpack-%E6%96%87%E4%BB%B6%E5%88%86%E7%A6%BB%E6%80%9D%E6%83%B3/)

#### 线程和进程

#### 静态资源放置于独立域名之下的好处

1. 流览器的很多机制对网站的访问速度有很大的影响（例如浏览器对静态资源的缓存机制），此外浏览器为提升页面显示效率，支持并发获取资源。浏览器对并发请求的数目限制是针对域名的，即针对同一域名（包括二级域名）在同一时间支持的并发请求数量的限制。如果请求数目超出限制，则会阻塞。因此，网站中对一些静态资源，使用不同的一级域名，可以提升浏览器并行请求的数目，加速界面资源的获取速度
2. 网络请求时cookie传输

当静态资源与主服务在同一域名下（根据业务需要，主服务请求时需要传递cookie信息），每次静态资源的请求，都会发送同域名下的cookie。而对于静态资源，服务器无需对cookie进行任何处理，它们只是在毫无意义的消耗带宽。
假设网站cookie信息有1 KB、网站首页共150个资源时，用户在请求过程中需要发送150 KB的cookie信息，在512 Kbps的常见上行带宽下，需要长达3秒左右才能全部发送完毕。很多情况下cookie的path是在整个一级域名下可用的，如果你把静态资源设置成二级域名，那么它也避免不了cookie。例如如果给 http://126.com 设置了cookie,那么会感染所有子域名, 请求 http://www.126.com/logo.gif或者http://image.126.com/logo.gif 时便会带上讨厌的cookie。
所以对于静态资源使用单独的域名，并设置为无cookie，以减少请求大小，提高网页性能。启用新的一级域名，每次请求浏览器不会携带cookie。这对于cookie内容比较大，并且流量大的网站会省去不少宽带费用

3. 方便分流或缓存

动静分离。静态资源与动态内容分离，有利于部署于CDN。静态资源独立部署，为全局产品服务。方便复用，放在一个服务器上的文件可以共其他服务器上的产品使用。 比如taobao.com和tmll.com都会用到tbcdn.cn上的静态资源，这些资源不必从属于某个产品。
这样同时也有利于最大化利用客户端缓存。比如访问taobao.com，缓存了tbcdn.cn上的某个js文件，之后再访问tmll.com时，也用到此js文件，不必再从tbcdn.cn上下载，直接用客户端缓存即可。


#### 为什么浏览器会限制ajax并行请求数量，有办法突破限制吗
1. 为什么浏览器会限制 ajax 并行请求数量？

答：浏览器发出网络请求需要新开线程，而且可以发出请求的端口数量有限，从开销角度考虑不可能无限发出并发请求；此外如果浏览器不作限制，大量的请求同时发至服务器，也可能超过服务器的处理并发请求的数量阈值（针对单个 IP），从而导致请求失败。
2.有办法突破限制吗？

答：浏览器的并发请求数目限制针对同一域名，因此可以将请求分散至多个域名，比如将静态资源放置于 CDN 等。此外可以使用 HTTP/2.0 协议，其多路复用技术能够变相解决浏览器并发请求数量限制的问题。
[原文链接](https://blog.csdn.net/z69183787/article/details/105773186)

http协议

#### 美团面试题
[博客](https://juejin.im/post/6844904119338008590)


header 1 | header 2
---|---
row 1 col 1 | row 1 col 2
row 2 col 1 | row 2 col 2

