# css

## BFC
- BFC（Block Formatting Context）格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

- BFC的布局规则
    - 内部的Box会在垂直方向一个接着一个地放置。
    - Box垂直方向上的距离由margin决定。属于同一个BFC的两个相邻的Box的margin会发生重叠。
    - 每个盒子的左外边框紧挨着包含块的左边框，即使浮动元素也是如此。
    - BFC的区域不会与float box重叠。
    - BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
    - 计算BFC的高度时，浮动子元素也参与计算。

- 形成BFC的条件
    - 浮动元素，float 除 none 以外的值； 
    - 绝对定位元素，position（absolute，fixed）； 
    - display 为以下其中之一的值 inline-block，table-cell，table-caption、flex； 
    - overflow 除了 visible 以外的值（hidden，auto，scroll）；
    - body 根元素




## flex
- [flex弹性布局](https://juejin.im/post/6846687604541227015)
- flex:1
    - flex:1 1 auto;
    - flex-grow属性用于设置或检索弹性盒子的扩展比率，flex元素仅在子元素宽度之和小于容器的时候才会发生伸展
    - flex-shrink属性用于指定flex盒子的收缩规则，flex元素仅在子元素宽度之和大于容器的时候才会发生收缩
    - flex-basis用于设置弹性盒子收缩伸展的基准值



## grid
- [grid 网格布局](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
