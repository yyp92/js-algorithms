# nodeJs

## nodemon
- 它的作用是监听代码文件的变动，当代码改变之后，自动重启。
- [Node自动重启工具 nodemon](https://www.jianshu.com/p/3b3b8bf9c4e9)



## nvm（非windows系统），nvm-windows(windows系统)
- nodejs 版本管理工具
### nvm-window
- [nvm-window](https://github.com/coreybutler/nvm-windows)

### nvm
- [nvm](https://github.com/nvm-sh/nvm)



## 全局模块和非全局模块
### 全局模块，直接使用，不需要加载
- process模块

### 非全局模块，不能直接使用，需要require('模块')
- fs模块




## fs模块
### 文件路径问题
- __dirname: 表示，当前正在执行的 js 文件所在的目录。
- __filename：表示，当前正在执行的 js 文件的完整路径。（就是加上文件名）


### error-first 错误优先
- nodejs 函数第一个参数都是err（没有错误就为 null）

