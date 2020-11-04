/* 
数组去重
资料：https://juejin.im/post/6844903602197102605
*/

// 双循环去重
// 时间复杂度是O(n^2)
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }

    let res = [arr[0]]

    for (let i = 1; i < arr.length; i++) {
        let flag = true

        for (let j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) {
                flag = false;
                break
            }
        }

        if (flag) {
            res.push(arr[i])
        }
    }

    return res
}



// indexOf方法去重1
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }

    let res = []

    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }

    return res
}



// set与解构赋值去重
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    
    return [...new Set(arr)]
}



