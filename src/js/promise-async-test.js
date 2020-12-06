// promise
const p1 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('p1')
        resolve()
      }, 2000)
    })
}

const p2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
        console.log('p2')
        resolve()
        }, 2000)
    })
}

const p3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
        console.log('p3')
        resolve()
        }, 2000)
    })
}

async function createQueue(tasks) {
    const [p1, p2, p3] = tasks;

    // promise 链式调用
    // return p1().then(() => {
    //     return p2()
    // })
    // .then(() => {
    //     return p3()
    // })
    // .then(() => {
    //     return 'done'
    // })

    // async await
    // await p1();
    // await p2();  
    // await p3();
    // return 'done';

    // async await 优化版(继发执行，使用for循环)
    for (let i = 0; i < tasks.length; i++) {
        await tasks[i]();
    }

    return 'done';
}

// 期待每隔两秒输出p1、p2、p3，最后输出'done'
createQueue([p1, p2, p3]).then((msg) => {
    console.log(msg) // 'done'
})




// async
// 多个异步同时继发
function getFoo() {
    console.log('getFoo---')
    setTimeout(() => {
        console.log('getFoo')
    }, 3000)
}

function getBar() {
    console.log('getBar---')
    setTimeout(() => {
        console.log('getBar')
    }, 3000)
}

async function runAsync() {
    // 顺序触发
    await getFoo()
    await getBar()

    // 同时触发的写法
    // 1
    let [foo, bar] = await Promise.all([getFoo(), getBar()])

    // 2
    let fooPromise = getFoo()
    let barPromise = getBar()
    let foo = await fooPromise
    let bar = await barPromise
}
runAsync()




// 如果没有return， 则then函数是拿不到值，和promise一样
async function isNeedReturn() {
    await 'await1'
    await 'await2'

    return 'end'
}
isNeedReturn().then((res) => {
    console.log('res: ', res)
})
// 有return值，res:  end
// 无return值，res:  undefined





/* 
    promise.all([]) --> Promise {<fulfilled>: Array(0)}
    promise.all([1]) --> Promise {<fulfilled>: Array(1)}
    promise.race([]) --> Promise {<pending>}
    promise.race([1]) --> Promise {<fulfilled>: 1}
*/
// Promise {<fulfilled>: Array(0)}
Promise.all([]).then(res => {
    console.log('all []: ', res) // all []:  []
})

// Promise {<fulfilled>: Array(1)}
Promise.all([1]).then(res => {
    console.log('all [1]: ', res) // all [1]:  [1]
})

// Promise {<pending>}
Promise.race([]).then(res => {
    console.log('race []: ', res) // 因为是pending，所以没有执行then
})

// Promise {<fulfilled>: 1}
Promise.race([1]).then(res => {
    console.log('race [1]: ', res) // race [1]:  1
})






/* 
    setTimeout promise(then catch 问题) async
*/

setTimeout(() => {
    console.log(1)
}, 0)

asyncFunc()

new Promise((resolve, reject) => {
    console.log(2)
    reject(3)
})
// .then(console.log, console.log)
// .catch(() => {
//     // 因为上面的then中出现了reject函数，所以下面的catch不会起作用
//     console.log(4)
// })
.then(console.log)
.catch(() => {
    // 如果上面的then没有reject，则错误会被catch捕获到
    console.log(4)
}) // 5 2 6 4 1

async function asyncFunc() {
    await (function test() {
        console.log(5)
    })()
    await new Promise((resolve, reject) => {
        console.log(6)
        reject(7)
    })

    // 因为上面的await中，出现了reject(7)，而且没有捕获错误，所以不往下执行了
    console.log(8)
}

// 5 2 6 3 1