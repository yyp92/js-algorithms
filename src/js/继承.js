/* 
    实现继承
*/

// es5
/* 
    1. 原型链继承

    核心：将父类实例作为子类原型

    优点：方法复用
        - 由于方法定义在父类的原型上，复用父类构造函数的方法，比如say方法

    缺点：
        - 创建子类实例的时候，不能传父类的参数（比如name）
        - 子类实例共享了父类构造函数的引用属性，比如arr属性
        - 无法实现多继承
*/
function Parent(name, age) {
    // 实例基本属性（该属性，强调私有 --> 仅仅是强调，不共享）
    this.name = name || '父亲';
    this.age = age || 20;

    // （该属性，强调私有）
    this.arr = [1];
}

// 将需要复用、共享的方法定义在父类原型上
Parent.prototype.say = function() {
    console.log('hello-parent')

    return 'hello-parent'
}

function Child(like) {
    this.like = like
}

// 核心
// 但此时Child.prototype.constructor === Parent
Child.prototype = new Parent()
// 修正constructor指向
Child.prototype.constructor = Child

let boy1 = new Child()
let boy2 = new Child()

// 优点：共享了父类构造函数的say方法
console.log(boy1.say(), boy2.say(), boy1.say() === boy2.say()) // hello-parent hello-parent true

// 缺点1：不能向父类构造函数传参
console.log(boy1.name, boy2.name, boy1.name === boy2.name) // 父亲 父亲 true

// 缺点2：子类实例共享了父类构造函数的引用属性，比如arr属性
boy1.arr.push(2)
// 修改了boy1的arr属性。boy2的arr属性，也会变化。因为两个实例的原型上（Child.prototype）有了父类构造函数的实例属性arr，所以只要修改了boy1.arr，boy2.arr的属性也会变化。
console.log(boy2.arr) // [1, 2]

// 注意1： 修改boy1的name属性，是不会影响到boy2.name，因为boy1.name相当于在子类实例新增了那么属性(简单的数据类型)。
boy1.name = 'Tom'
boy1.age = 10
console.log(boy1.name, boy2.name, boy1.name === boy2.name)
console.log(boy1.age, boy2.age, boy1.age === boy2.age)
// Tom 父亲 false
// 10 20 false

// 注意2： 
// 如果不加Child.prototype.constructor = Child, boy1.constructor 指向Parent。而实际上我们希望子类实例的构造函数是Child，所以得修复一下构造函数的指向
console.log(boy1.constructor) // Parent




/* 
    2. 借用构造函数

    核心：借用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类。

    优点：实例之间独立
        - 创建子类实例，可以向父类构造函数传参数
        - 子类实例不共享父类构造函数的引用属性，如arr属性
        - 可实现多继承（通过多个call或者apply继承多个父类）

    缺点：
        - 父类方法不能复用
            - 由于方法在父类构造函数中定义，导致方法不能复用（因为每次创建子类实例都要创建一遍方法）。比如say方法。（方法应该要复用、共享）
        - 子类实例，继承不了父类原型上的属性（因为没有用到原型）。
*/
function Parent(name, age) {
    // 实例基本属性（该属性，强调私有 --> 仅仅是强调，不共享）
    this.name = name || '父亲';
    this.age = age || 20;

    // （该属性，强调私有）
    this.arr = [1];

    this.say = function() {
        console.log('hello-parent')
    }
}

function Child(name, like) {
    // 核心：复制了父类的实例属性和方法
    Parent.call(this, name)

    this.like = like
}

let boy1 = new Child('xioahong', 'apple')
let boy2 = new Child('xioaming', 'orange')

// 优点1：可向父类构造函数传参
console.log(boy1.name, boy2.name) //xioahong  xioaming
// 优点2：不共享父类构造函数的引用属性
boy1.arr.push(2)
console.log(boy1.arr, boy2.arr) // [1, 2] [1]

// 缺点1：方法不能复用
console.log(boy1.say === boy2.say) // false (说明boy1 和boy2的say方法是独立，不是共享的)
// 缺点2：不能继承父类原型上的方法
Parent.prototype.walk = function() {
    // 在父类的原型对象上定义一个walk方法
    console.log('我会走路')
}
console.log(boy1.walk) // undefined (说明实例，不能获得父类原型上的方法)





/* 
    3. 组合继承

    核心：通过调用父类构造函数，继承父类的属性并保留传参的优点；然后通过将父类实例作为子类原型，实现函数复用。

    优点：
        - 保留构造函数的优点：创建子类实例，可以向父类构造函数传参数。
        - 保留原型链的优点：父类的方法定义在父类的原型对象上，可以实现方法复用。
        - 不共享父类的引用属性，比如arr属性

    缺点：
        - 由于调用了2次父类的构造方法，会存在一份多余的父类实例属性，具体原因见文末。
    
    注意：
        ’组合继承‘ 这种方式，要记得修复Child.prototype.constructor指向，第一次Parent.call(this)；从父类拷贝一份父类的实例属性，作为子类的实例属性，第二次Child.proptotype = new Parent(); 创建父类实例作为子类原型中的父类属性和方法会被第一次拷贝来的实例属性屏蔽掉，所以多余。
*/
function Parent(name, age) {
    // 实例基本属性（该属性，强调私有 --> 仅仅是强调，不共享）
    this.name = name || '父亲';
    this.age = age || 20;

    // （该属性，强调私有）
    this.arr = [1];
}

// 将需要复用、共享的方法定义在父类原型上
Parent.prototype.say = function() {
    console.log('hello-parent')
}

function Child(name, like) {
    // 第二次
    // 核心：复制了父类的实例属性和方法
    Parent.call(this, name)

    this.like = like
}

// 核心 第一次
Child.prototype = new Parent()

// 修正constructor指向
Child.prototype.constructor = Child

let boy1 = new Child('xioahong', 'apple')
let boy2 = new Child('xioaming', 'orange')

// 优点1：可以向父类构造函数传参数
console.log(boy1.name, boy1.like) // xioahong apple
// 优点2：可以复用父类原型上的方法
console.log(boy1.say === boy2.say) // true
// 优点3：不共享父类的引用属性。如arr属性
boy2.arr.push(2)
console.log(boy1.arr, boy2.arr) // [1, 2] [1]

// 缺点1：由于调用了2次父类的构造方法，会存在一份多余的父类实例属性

// 其实 Child.prototype = new Parent()
// 因为Child.prototype 等于Parent的实例，所以__proto__指向Parent.prototype
console.log(Child.prototype.__proto__ === Parent.prototype) // true





/* 
    4. 组合继承 - 优化1

    核心：通过这种方式，砍掉父类的实例属性，这样在调用父类的构造函数的时候，就不会初始化两次实例，避免组合继承的缺点。

    优点：
        - 只调用一次父类构造函数
        - 保留构造函数的优点：创建子类实例，可以向父类构造函数传参数
        - 保留原型链的优点：父类的实例方法定义在父类的原型对象上，可以实现方法复用

    缺点：
        - 修正构造函数的指向之后，父类实例的构造函数指向，同时也发生变化（这是我们不希望的）
    
    注意：
        ’组合继承优化1‘ 这种方式，要记得修复Child.prototype.constructor指向

    原因：
        不能判断子类实例的直接构造函数，到底是子类构造函数还是父类构造函数。
*/
function Parent(name, age) {
    // 实例基本属性（该属性，强调私有 --> 仅仅是强调，不共享）
    this.name = name || '父亲';
    this.age = age || 20;

    // （该属性，强调私有）
    this.arr = [1];
}

// 将需要复用、共享的方法定义在父类原型上
Parent.prototype.say = function() {
    console.log('hello-parent')
}

function Child(name, like) {
    // 核心：复制了父类的实例属性和方法
    Parent.call(this, name)

    this.like = like
}

// 核心 子类原型和父类原型，实质上确实同一个
Child.prototype = Parent.prototype

// 这里是修复构造函数指向的代码
let boy1 = new Child('xioahong', 'apple')
let boy2 = new Child('xioaming', 'orange')
let p1 = new Parent('小爸爸')

// 优点1：可以向父类构造函数传参数
console.log(boy1.name, boy1.like) // xioahong apple
// 优点2：可以复用父类原型上的方法
console.log(boy1.say === boy2.say) // true

// 缺点1：当修复子类构造函数的指向后，父类实例的构造函数指向也会跟着变了
// 没修复之前：
console.log(boy1.constructor) // Parent
// 修复代码：
Child.prototype.constructor = Child
// 修复之后：
console.log(boy1.constructor) // Child
console.log(p1.constructor) // Child (这就是问题，我们希望是Parent)

// 具体原因：因为是通过原型来实现继承的，Child.prototype的上面是没有constructor属性的。就会往上找，这样就找到了Parent.prototype上面的constructor属性；当你修改了子类实例的constructor属性，所有的constructor的指向都会发生变化。





/* 
    5. 组合继承 - 优化2，又称 寄生组合继承 --> 完美方式

    核心：---

    优点：完美

    缺点：---
*/
function Parent(name, age) {
    // 实例基本属性（该属性，强调私有 --> 仅仅是强调，不共享）
    this.name = name || '父亲';
    this.age = age || 20;

    // （该属性，强调私有）
    this.arr = [1];
}

// 将需要复用、共享的方法定义在父类原型上
Parent.prototype.say = function() {
    console.log('hello-parent')
}

function Child(name, like) {
    // 核心：复制了父类的实例属性和方法
    Parent.call(this, name)

    this.like = like
}

// 核心 通过创建中间对象，子类原型和父类原型，就会隔离开。不是同一个啦，有效避免了方式4的缺点。
Child.prototype = Object.create(Parent.prototype)

// 这里是修复构造函数指向的代码
Child.prototype.constructor = Child

let boy1 = new Child('xioahong', 'apple')
let boy2 = new Child('xioaming', 'orange')
let p1 = new Parent('小爸爸')

console.log(boy1.name, boy1.like) // xioahong apple
console.log(boy1.say === boy2.say) // true
console.log(boy1.constructor) // Child
console.log(p1.constructor) //Parent










// es6
class Parent {
    constructor(props) {
        // super(props)

        this.name = props.name || '父亲'
        this.age = props.age || 20
    }

    say() {
        console.log('parent')
    }
}

class Child extends Parent {
    constructor(props) {
        // super 此时指向父类的构造函数
        super(props)
        // this.name = props.name
        // this.age = props.age
    }
}

const c1 = new Child({name: 'Tom', age: 18})
const c2 = new Child({name: 'JK', age: 16})
const p1 = new Parent('PP', 30)

console.log(c1.name, c1.age, c2.name, c2.age) // Tom 18 JK 16
console.log(c1.say === c2.say) // true
console.log(c1.constructor, c2.constructor, p1.constructor)
// Child Child Parent