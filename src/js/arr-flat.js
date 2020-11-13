/* 
实现扁平化
资料：https://juejin.im/post/6844903805876699150
*/

const arr = [1,23,5,[2,5,6],[4,5,[3,2]]];


// flat
const list = arr.flat(Infinity)
console.log(list);



// for循环
function flatten(arr) {
    var res = [];

    for (let i = 0, length = arr.length; i < length; i++) {
        if (Array.isArray(arr[i])) {
            // concat 并不会改变原数组
            res = res.concat(flatten(arr[i]));
        }
        else {
            res.push(arr[i]);
        }
    }
    
    return res;
}



