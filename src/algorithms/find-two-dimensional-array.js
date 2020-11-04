/* 
二维数组中的查找

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例：
    现有矩阵 matrix 如下：
        [
            [1,   4,  7, 11, 15],
            [2,   5,  8, 12, 19],
            [3,   6,  9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30]
        ]

结果：
    给定 target = 5，返回 true。    
    给定 target = 20，返回 false。

限制：
    0 <= n <= 1000
    0 <= m <= 1000
*/


// 暴力法
// 遍历数组中的所有元素，找到是否存在。
// 时间复杂度是 O(N^2)，空间复杂度是 O(1)
var findNumberIn2DArray = function(matrix, target) {
    const rowNum = matrix.length;

    if (!rowNum) {
        return false;
    }

    const colNum = matrix[0].length;

    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (matrix[i][j] === target) {
                return true;
            }
        }
    }

    return false;
};




// 观察数组规律
/* 
数组的特点是：每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序
考虑以下数组：
    1   2   3
    4   5   6
    7   8   9

    在其中寻找 5 是否存在。过程如下：
        从右上角开始遍历
        当前元素小于目标元素(3 < 5)，根据数组特点，当前行中最大元素也小于目标元素，因此进入下一行
        当前元素大于目标元素(6 > 5)，根据数组特点，行数不变，尝试向前一列查找
        找到 5
*/
var findNumberIn2DArray = function(matrix, target) {
    const rowNum = matrix.length;
    if (!rowNum) {
        return false;
    }
    const colNum = matrix[0].length;

    if (!colNum) {
        return false;
    }

    let row = 0;
    let col = colNum - 1;

    while (row < rowNum && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        }
        else if (matrix[row][col] > target) {
            --col;
        }
        else {
            ++row;
        }
    }

    return false;
};

