/* 
 * 斐波那契数列
 * @description 求斐波那契数列第n项
 * @param {number} n 项目数
 * @return {number} 返回第n项值
 */
function fibonacci(n, v1 = 1, v2 = 1) {
    if (n <= 1) {
        // 测试
        console.log('----', v1, v2, n)
        return v2
    }

    return fibonacci(n - 1, v2, v1 + v2)
}
fibonacci(10)
// 测试
// 55 89 1


/* 
 * 字符串出现的不重复最长长度
 */
function longNoRepeatStr(str) {
    let max = -Infinity;
    let count = 0;
    let pre = null;

    for (let index = 0; index < str.length; index++) {
        const cur = str[index];

        if (cur !== pre) {
            count += 1;
        } else {
            count = 1;
        }

        pre = cur;

        if (count > max) {
            max = count;
        }
    }

    console.log('max:', max)
    return max;
}

longNoRepeatStr("aabccddabcdea"); // 6