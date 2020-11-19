# webpack相关

## webpack编译流程
### webpack 构建流程
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### Webpack的运行流程是一个串行的过程，从启动到结束依次执行以下流程：
- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
- 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
- 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

- [webpack编译流程](https://juejin.im/post/6844903935828819981)



## 缓存、tree-shaking



## webpack 给我们提供了三种哈希值计算方式，分别是 hash、chunkhash 和 contenthash。那么这三者有什么区别呢？
- hash：跟整个项目的构建相关，构建生成的文件hash值都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。
- chunkhash：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。
- contenthash(加在css文件)：计算与文件内容本身相关，主要用在css抽取css文件时。

- [webpack中的hash、chunkhash、contenthash分别是什么](https://juejin.im/post/6844903935812059144)



## webpack常用的 loader 和 plugin
### lodaer
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

### plugin
- ignore-plugin：忽略文件。
- uglifyjs-webpack-plugin：webpack4之前，压缩和混淆代码，不支持 ES6 压缩。
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
    - [官网](https://www.webpackjs.com/plugins/define-plugin/)
- optimize-css-assets-webpack-plugin：不同组件中重复的 css 可以快速去重。
- webpack-bundle-analyzer：一个 webpack 的 bundle 文件分析工具。
- compression-webpack-plugin：生产环境可采用 gzip 压缩 JS 和 CSS。
- happypack：通过多进程模型，来加速代码构建。



## DLLPlugin 和 DLLReferencePlugin
- 共同点：总结就是为了分散 bundle 包，加快编译过程而生的。
- DllPlugin 生成资源manifest.json.
```javascript
{
  "name": "vendorRequire",
  "content": {
    "../node_modules/webpack/node_modules/node-libs-browser/node_modules/process/browser.js": 1,
    "../node_modules/react/node_modules/fbjs/lib/invariant.js": 2,
    "../node_modules/react/node_modules/fbjs/lib/warning.js": 3,
    "../node_modules/react/lib/reactProdInvariant.js": 4,
    "../node_modules/react/node_modules/object-assign/index.js": 5,
    "../node_modules/react/lib/ReactDOMComponentTree.js": 6, 

    /*more*/

    "../node_modules/react/react.js": 171,
    "./vendors.js": 172
}
```

- DllReferencePlugin 是在打包过程中使用的，在打包业务代码时，每遇到一个在manifest.json中出现的文件，就可以利用上述 vendor.bundle.js 暴露的全局函数进行相应处理，而不会把这个文件打包进来。
```javascript
// 在业务代码中遇到 require('react'), 会被打包成这个样子：
/* 173 */
/***/ function(module, exports) {

	module.exports = vendorRequire;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(173))(171);

/***/ },
```

- [DLLPlugin 和 DLLReferencePlugin的使用](https://juejin.im/post/6847902219418009607)
- [webpack里面 DllPlugin 和 DllReferencePlugin 这两个插件怎么使用？](https://www.zhihu.com/question/40778044)



## webpack js 抽取打包
- [SplitChunksPlugin和DllPlugin区别](https://kazehaiya.github.io/2019/05/23/webpack-%E6%96%87%E4%BB%B6%E5%88%86%E7%A6%BB%E6%80%9D%E6%83%B3/)




## 配置项
-  resolve.extensions (配置省略文件路径的后缀名)
```javascript
// 比如同一个目录有不同类型的同名文件，只会匹配第一个
resolve: {
  // 配置省略文件路径的后缀名
  extensions: ['.js', '.json', '.jsx', '.css']
}
```
