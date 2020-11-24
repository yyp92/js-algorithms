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
    await p1();
    await p2();  
    await p3();
    return 'done';
}

// 期待每隔两秒输出p1、p2、p3，最后输出'done'
createQueue([p1, p2, p3]).then((msg) => {
    console.log(msg) // 'done'
})