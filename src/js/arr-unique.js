/* 
数组去重
资料：https://juejin.im/post/6844903602197102605
*/

// 双循环去重
// 时间复杂度是O(n^2)
function unique1(arr) {
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
function unique2(arr) {
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
function unique3(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    
    return [...new Set(arr)]
}


// 双循环，操作原数组
const unique4 = (arr = []) => {
    arr.sort((pre, next) => {
        return pre.key - next.key
    })
    console.log('-----arr', arr)

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            // 数值和数据类型都相等
            if (arr[i].key === arr[j].key && arr[i].value === arr[j].value) {
                // arr.splice(i, 1);  // 改成arr.splice(j,1);  j--;  的话，可以一次就把同一的重复的都去掉
                // i--;

                arr.splice(j, 1); 
                j--;
            }
        }
    }
        
    return arr
}



// 测试数据
/* 
    两个 for 循环
*/
let arr = [{
    key: '01',
    value: '小张'
 }, {
    key: '03',
    value: '小李'
 },{
    key: '02',
    value: '小王'
 }, {
    key: '03',
    value: '小李'
 },{
    key: '01',
    value: '小王'
 }];

console.log('---------', unique4(arr))



