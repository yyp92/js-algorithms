/* 
    手写promise， 目前只实现了：then的链式调用，catch
*/

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    // TypeError: Chaining cycle detected for promise #<Promise>
    if (promise2 === x) {
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise'))
    }

    // 避免重复调用成功或失败的回调
    let called = false;

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        /*
            可能为 throw error, 所以用try catch
            Object.defineProperty(x, 'then', {
                get() {
                    throw new Error()
                }
            }) 
        */
        try {
            let then = x.then;

            // x 为 Promise
            if (typeof then === 'function') {
                // this 指向这个新的promise
                then.call(x, (y) => {
                    if (called) {
                        return;
                    }
                    called = true;

                    // resolve(y);
                    // 需要递归处理，要不就会返回MyPromise实例
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;

                    reject(r);
                })
            }
            else {
                resolve(x);
            }
        }
        catch (e) {
            if (called) {
                return;
            }
            called = true;

            reject(e);
        }
    }
    else {
        resolve(x);
    }
}

class MyPromise {
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 存放成功或失败的回调函数
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];


        // 放到里面，是因为每次都需要生成不一样的回调函数
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;

                // 发布
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                // 发布
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        // 解决捕获到异常后，能够走reject
        try {
            executor(resolve, reject)
        }
        catch (e) {
            reject(e);
        }
    }

    // x 普通值 || promise
    // resolvePromise 来处理 x 是不是promise
    // setTimeout 来模拟异步
    // promise规范：then参数是可选的，要是没有参数则继续走下去
    then (onFulfilled, onRejected) {
        // 给定参数默认值
        onFulfilled = typeof onFulfilled === 'function'
            ? onFulfilled
            : value => value;
        onRejected = typeof onRejected === 'function'
            ? onRejected
            : reason => {
                throw reason;
            };
        
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                try {
                    setTimeout(() => {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }, 0);
                }
                catch (e) {
                    reject(e)
                }
            }
    
            if (this.status === REJECTED) {
                try {
                    setTimeout(() => {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }, 0);
                }
                catch (e) {
                    reject(e)
                }
            }
    
            if (this.status === PENDING) {
                    // 订阅
                    this.onFulfilledCallbacks.push(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    });
        
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    });
            }
        });

        return promise2;
    }

    catch(errorCallback) {
        return this.then(null, errorCallback);
    }
}

// 因为node环境是commonJs规范
module.exports = MyPromise;