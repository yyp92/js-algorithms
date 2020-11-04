/* 
快速排序
思想: 
    (1）在数据集之中，选择一个元素作为"基准"（pivot）。
　　（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
　　（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
*/
var quickSort = function(arr) {
　　if (arr.length <= 1) {
        return arr;
    }

　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];

　　for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }

　　return quickSort(left).concat([pivot], quickSort(right));
};




/* 
冒泡排序
思想：数组中有n个数，从第一个数开始，逐个比较相邻的两数，如果前面的大于后面的，交换位置，将比较大的数往后排。
*/
function bubbleSort(arr) {
    // 已经完成的标志位
    let done

    let len = arr.length

    for (let i = 0; i < len - 1; i++) {
        done = true

        for (let j = 0; j < len - 1 - i; j++) {
            // 可以省略
            // if (arr[j] > Number.MAX_VALUE || arr[j] < -Number.MAX_VALUE) {
            //     return "数值溢出！"
            // }

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                done = false
            }
        }

        if (done) {
            return arr
        }
    }
    
    return arr;
}
