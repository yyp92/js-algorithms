/* 
    本质：调用自身
    两个要素：
        终止条件
        逐步靠近终止条件
*/

/* 
    加法：
    f(5) = 5 + f(4)
         = 5 + 4 + f(3)
         = 5 + 4 + 3 + f(2)
         = 5 + 4 + 3 + 2 + f(1)
*/
function add(num) {
    if (num <= 1) {
        return 1;
    }

    return num + add(num - 1)
}
console.log(add(5))


/* 
    乘法：
    f(5) = 5 * f(4)
         = 5 * 4 * f(3)
         = 5 * 4 * 3 * f(2)
         = 5 * 4 * 3 * 2 * f(1)
*/
function multiplication(num) {
    if (num <= 1) {
        return 1;
    }

    return num * multiplication(num - 1)
}

console.log(multiplication(5))