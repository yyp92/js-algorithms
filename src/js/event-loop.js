/*
    事件循环测试
*/

console.log('start');

// try {
//     throw new Error('try error')
// }
// catch(e) {
//     console.log(e)
// }


setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve()
// 因为.then 会放到微任务中
// 放到第一层微任务中
.then(() => {
    console.log('Promise1 then1')
})
// 放到第二层微任务中
.then(() => {
    console.log('Promise2 then2')
})

// 无论如何，async await中的第一个await都会第一次执行，相当于是同步执行
async function test() {
    // 第一await不是异步，则会立刻执行
    await test1();
    
    // 放到第一层微任务中
    await test2();

    // 放到第二层微任务中
    console.log('async1 end')
}

function test1() {
    console.log('async1')
}
function test2() {
    console.log('async1-1')
}
test()

async function foo() {

    /* 
        await Promise.reject('reject') 同步执行
        因为try catch 去捕获，是在Promise.reject之后捕获，相当于是在then里面执行
        所以放到第一个微任务中执行
    */
    try {
        await Promise.reject('reject')
    }
    catch(e) {
        console.log(e)
    }

    // 放到第一个微任务中执行
    await foo1()

    // 放到第二个微任务执行
    await foo2()

    return 'async2 end'
}
function foo1() {
    console.log('async2-1')
}
function foo2() {
    // 返回一个异步，结果和下边的一样，还是得看foo2执行时的await
    // return Promise.resolve().then(() => {
    //     console.log('async2-2')
    // })

    console.log('async2-2')
}

foo()
// 放到第三层微任务中
.then((value) => {
    console.log(value)
})


// 同步

// start
// async1


// 第一层微任务

// Promise1 then1
// async1-1
// e reject
// async2-1


// 第二层微任务

// Promise2 then2
// async1 end
// async2-2


// 第三层微任务

// async2 end


// 宏任务

// setTimeout