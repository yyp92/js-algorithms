# css

## css伪类、伪元素
- 伪类，**更多的定义的是状态**。常见的伪类有 :hover，:active，:focus，:visited，:link，:not，:first-child，:last-child等等。
- 伪元素，**不存在于DOM树中的虚拟元素**，它们可以像正常的html元素一样定义css，但无法使用JavaScript获取。常见伪元素有 ::before，::after，::first-letter，::first-line等等。
- CSS3明确规定了，伪类用一个冒号(:)来表示，而伪元素则用两个冒号(::)来表示。但目前因为兼容性的问题，它们的写法可以是一致的，都用一个冒号(:)就可以了，所以非常容易混淆。

- CSS3中的伪类
    - :root 选择文档的根元素，等同于 html 元素
    - :empty 选择没有子元素的元素
    - :target 选取当前活动的目标元素
    - :not(selector) 选择除 selector 元素意外的元素
    - :enabled 选择可用的表单元素
    - :disabled 选择禁用的表单元素
    - :checked 选择被选中的表单元素
    - :nth-child(n) 匹配父元素下指定子元素，在所有子元素中排序第n
    - :nth-last-child(n) 匹配父元素下指定子元素，在所有子元素中排序第n，从后向前数
    - :nth-child(odd) 、 :nth-child(even) 、 :nth-child(3n+1)
    - :first-child 、 :last-child 、 :only-child
    - :nth-of-type(n) 匹配父元素下指定子元素，在同类子元素中排序第n
    - :nth-last-of-type(n) 匹配父元素下指定子元素，在同类子元素中排序第n，从后向前数
    - :nth-of-type(odd) 、 :nth-of-type(even) 、 :nth-of-type(3n+1)
    - :first-of-type 、 :last-of-type 、 :only-of-type
- CSS3中的伪元素
    - ::after 已选中元素的最后一个子元素
    - ::before 已选中元素的第一个子元素
    - ::first-letter 选中某个款级元素的第一行的第一个字母
    - ::first-line 匹配某个块级元素的第一行
    - ::selection 匹配用户划词时的高亮部分




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
