# react 源码学习

## 学习问题





## createElement
### React.createElement里面做了哪些事儿？
- 声明一个props对象用来存放属性，defaultProps，以及孩子节点。
- 孩子节点存放在children属性里面，children可以是一个对象，可以是一个数组，取决于传入的孩子节点个数。
- 判断组件上是否有ref属性或者key属性，无为null。
- 返回一个ReactElement。

### 注意点
- 通过React.createElement创建的，$$typeof 一般都是 REACT_ELEMENT_TYPE
- [jsx --> react 转换工具](https://www.babeljs.cn/repl)

```javascript
React.createElement(type, config, children);

// jsx
// type --> 标签类型（div），原生的节点就是字符串，要是类组件和函数组件 --> 就是组件
// config --> 就是标签的属性值
// children --> 就是标签的内容
<div id="id" key="key">
    test
</div>
```




## ref
### 三种形式
- 字符串（即将被废弃掉）
- function
- React.create()

```javascript
// 注意函数组件是无法通过这三种来直接创建ref，得结合forwardRef来实现对函数组件创建ref
class test extends React.Component {
    constructor() {
        // 第三种形式
        // {current：null}
        this.objRef = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => {
            // 第一种
            this.refs.strRef.textContent = 'string'

            // 第二种
            this.methodRef.textContent = 'function'

            // 第三种
            this.objRef.current.textContent = 'string'
        }, 2000)
    }

    render() {
        return (
            <>
                <p ref="strRef"></p>
                <p ref={ele => (this.methodRef = ele)}></p>
                <p ref={this.objRef}></p>
            </>
        )
    }
}
```
