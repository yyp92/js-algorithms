/* 
    js 链式调用：主要思想就是返回this

    期望结果：
        Test('xiaoming') --> Hi! This is xiaoming

        Test('xiaoming').eat('aa').eat('bb') 
            --> Hi! This is xiaoming
                aa
                bb
        
        Test('xiaoming').sleep(2000).eat('aa').eat('bb') 
            --> Hi! This is xiaoming
                等待2s再输出...
                aa
                bb

        // TODO: 等看完 lodash 或 jquery 的源码后，再研究更加优化的方案
        // 目前是采用promise异步来实现的
        Test('xiaoming').firstSleep(2000).eat('aa').eat('bb') 
            --> 等待2s再输出...
                Hi! This is xiaoming
                aa
                bb
*/
// es5
function Test(name) {
    const chain = new Chain(name);

    return chain
}

function Chain(name) {
    const value = 'Hi! This is';
    this.delay = 0;
    this.firstDelay = 0;

    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log(value, name)
        }, this.firstDelay)
    })
}

Chain.prototype.eat = function(value) {
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Eat ', value)
        }, this.delay || this.firstDelay)
    })
    
    return this;
}

Chain.prototype.sleep = function(delay) {
    this.delay = delay;

    return this;
}

Chain.prototype.firstSleep = function(delay) {
    this.firstDelay = delay;

    return this;
}

// Test('xiaoming')
// Test('xiaoming').eat('aa').eat('bb')
// Test('xiaoming').sleep(3000).eat('aa').eat('bb')
// Test('xiaoming').firstSleep(3000).eat('aa').eat('bb')