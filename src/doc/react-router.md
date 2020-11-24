# react-router

## react router 原理（怎么监听到url变化）
- 主要依赖与history库
- [react-router的实现原理](https://segmentfault.com/a/1190000004527878)




## Hash 和 History 模式的区别
- hash模式较丑，history模式较优雅
- pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
- pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中
- pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
- pushState可额外设置title属性供后续使用
- hash兼容IE8以上，history兼容IE10以上
- history模式需要后端配合将所有访问都指向index.html，否则用户刷新页面，会导致404错误

### 资料
- [深入理解前端中的 hash 和 history 路由](https://zhuanlan.zhihu.com/p/130995492)




## link标签和a标签的区别
- Link标签是react-router里实现路由跳转的链接，一般配合Route使用，react-router接下了其默认的链接跳转行为，区别于传统的页面跳转，Link标签的"跳转"行为只会触发相匹配的Route**对应的页面内容更新，而不会刷新整个页面**。
- a标签会造成整个页面的刷新。