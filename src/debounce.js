/* 
防抖

原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
适用场景：
    按钮提交场景：防止多次提交按钮，只执行最后提交的一次。
    搜索框联想场景：防止联想发送请求，只发送最后一次输入。
*/

// 简易版
// function debounce(func, wait) {
//     let timeout;

//     return function () {
//         const context = this;
//         const args = arguments;
//         clearTimeout(timeout);

//         timeout = setTimeout(function(){
//             func.apply(context, args)
//         }, wait);
//     }
// }
// debounce(() => {console.log('执行')}, 1000)() // 执行


// 立即执行版实现
// 有时希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
// function debounce(func, wait, immediate) {
//     let timeout;

//     return function() {
//         const context = this;
//         const args = arguments;

//         if (timeout) {
//             clearTimeout(timeout);
//         }

//         if (immediate) {
//             const callNow = !timeout;
//             timeout = setTimeout(function() {
//                 timeout = null;
//             }, wait)

//             if (callNow) {
//                 func.apply(context, args)
//             }
//         }
//         else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//             }, wait);
//         }
//     }
// }
// debounce((...args) => console.log('args:', args), 1000)('test', 'debounce'); // args: [ 'test', 'debounce' ]




// 返回值版实现
// func函数可能会有返回值，所以需要返回函数结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以只在 immediate 为 true 的时候返回函数的执行结果。
function debounce(func, wait, immediate) {
    let timeout;
    let result;

    return function() {
        const context = this;
        const args = arguments;

        if (timeout) {
            clearTimeout(timeout);
        }

        if (immediate) {
            const callNow = !timeout;

            timeout = setTimeout(function() {
                timeout = null;
            }, wait)

            if (callNow) {
                result = func.apply(context, args)
            }
        }
        else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait);
        }

        return result;
    }
}
debounce((...args) => console.log('args:', args), 1000)('test', 'debounce')
// args: [ 'test', 'debounce' ]
  

