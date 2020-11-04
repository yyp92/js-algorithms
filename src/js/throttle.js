/* 
节流
原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
适用场景
    拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
    缩放场景：监控浏览器resize
*/

// 使用时间戳实现
// 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
// function throttle(func, wait) {
//     let previous = 0;
  
//     return function () {
//         let now = +new Date();
//         let context = this;
//         let args = arguments;

//         if (now - previous > wait) {
//             func.apply(context, args);
//             previous = now;
//         }
//     }
// }



// 使用定时器实现
// 当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
function throttle(func, wait) {
    let timeout;

    return function() {
        const context = this;
        const args = arguments;

        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}