/* 
有一堆整数，请把他们分成三份，确保每一份和尽量相等
*/

function average(arr, count){
    // 数组从大到小排序
    arr.sort((a, b) => b - a);

    // 计算平均值
    let avg = arr.reduce((a, b) => a + b) / count;

    // 从大到小求和，取最接近平均值的一组，放入二维数组
    let resArr = [];
    let current = 0;

    for (let i = 0; i < count - 1; i++) {
        // 此时current是上一次的值，来检验是否与平均值接近
        if (current + arr[arr.length - 1] / 2 < avg && i) {
            arr.pop();
            resArr[i - 1].push(arr[arr.length - 1]);
        }

        current = 0;
        resArr[i] = [];

        for (let j = 0; j < arr.length; j++) {
            let item = arr[j];
            let index = j;

            current += item;
            arr.splice(index, 1);
            resArr[i].push(item);

            if (current > avg) {
                current -= item;
                arr.splice(index, 0, item);
                resArr[i].pop();
            }
        }
    }

    // 剩下的直接是第三组
    resArr[count - 1] = arr;
    console.log('resArr: ', resArr)
    return resArr;
}
// 测试，第一个参数为数组，第二个为份数
average([11, 42, 23, 4, 5, 6, 4, 5, 6, 11, 23, 42, 56, 78, 90], 3)

/* 
    [
        // 136
        [ 90, 42, 4 ],

        // 135
        [ 78, 42, 11, 4 ],

        // 135
        [ 56, 23, 23, 11, 6, 6, 5, 5 ] 
    ]
*/