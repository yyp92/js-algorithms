/* 
函数柯里化
函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

实现： 
    实现 add(1)(2)(3)
*/

// 参数长度不固定
function currying() {
    let args = [...arguments]

    temp.getValue = () => {
        return args.reduce((a, b) => a + b, 0)
    }

    function temp(...arg) {
        console.log('arg: ', arg)
        if(arg.length){
            args = [
                ...args,
                ...arg
            ]

            return temp
        }
    }

    return temp
}

console.log(currying(1)(2)(3).getValue());
console.log(currying()(2)(3)(4, 5).getValue());