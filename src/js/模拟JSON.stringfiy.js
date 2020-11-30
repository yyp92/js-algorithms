/* 
模拟JSON.stringify
    注意：
    禁止使用JSON.stringify函数
    val的类型只有object、array、number、string四种（简化题目）
*/

/**
 * @param {object|array|number|string} obj - 待format的数据
 * @return nothing
 */
function format(obj) {
    let str;

    // 因为数组可以隐式的转为字符串
    let json = [];

    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            json.push(
                // 思想：无论是数组还是对象，成员最终还是简单类型，所以运用递归的思想
                Array.isArray(obj)
                    // 数组
                    ? format(obj[key])

                    // 对象
                    : '"' + key + '": ' + format(obj[key])
            );
        }

        // 隐式的转为字符串： "" + [] + "" ==> 字符串
        str = Array.isArray(obj) ? '[' + json + ']' : '{' + json + '}';
    }
    // 非对象和数组 || null
    else {
        str = obj;
    }
    
    return str;
}
   
// test case
const data = {
    a: 1,
    b: [
        2,
        3,
        {
        c: 4
        }
    ],
    d: {
        e: 5,
        f: {
        g: '6'
        },
    }
}

// const data = [
//     {a: 1, b: 2},
//     4,
//     5,
//     ['a', 'b']
// ]
     
// test case
console.log(format(data));

/*
将在控制台中打印出
{
    "a": 1,
    "b": [
        2,
        3,
        {
        "c": 4
        }
    ],
    "d": {
        "e": 5,
        "f": {
        "g": "6"
        }
    }
}
*/



// 拓展知识点：
/* 
四种遍历数组的方法：
    for (let i = 0; i < arr.length; ++i)
    arr.forEach((v, i) => {})
    for (let i in arr)
    for (const v of arr)
*/

// const arr = [1, 2, 3]
// for (let i in arr) {
//     // i 是数组索引
//     console.log(i)
// }

// for (let i of arr) {
//     // i 是数组的值
//     console.log(i)
// }



// 隐形转为字符串
// 数组
// const aa = '"' + [1, 2, 3] + '"'
// console.log(aa, typeof aa) // "1,2,3" string

// 对象
// const aa = '"' + {a: 1, b: 2} + '"'
// console.log(aa, typeof aa) // "[object Object]" string