function Test() {
    log = () => {
        console.log(1)
    }

    return this
}

Test.log = () => {
    console.log(2)
}

Test.prototype.log = () => {
    console.log(3)
}

// 变量的声明提升，赋值的位置不变
var log = function() {
    console.log(4)
}

// 函数的声明提升，这个整体提升到作用域顶部
function log() {
    console.log(5)
}

// 结果
Test.log() // 2
log() // 4
new Test().log() // 3

// 此时log是window下的log，因为上面new Test()，重新给window下的log赋值
log() // 1
Test().log() // Test(...).log is not a function