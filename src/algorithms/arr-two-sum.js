/* 
    每组数只能出现一次

    示例1：
        const arr = [1, 1, 3, 4, 5, 7, 9, 11]
        const sum = 8
        const result = [(1, 7), (3, 5)]

    示例2：
        const arr = [1, 1, 3, 4, 5, 7, 7, 9, 11]
        const sum = 8
        const result = [(1, 7), (1, 7), (3, 5)]
*/
const arr = [1, 1, 3, 4, 5, 7, 9, 11]
const arr1 = [1, 1, 3, 4, 5, 7, 7, 9, 11]
const sum = 8

const findItems = (arr, sum) => {
    const result = []

    for (let i = 0; i < arr.length; i++) {
        const targetItem = sum - arr[i]
        let index = -1

        if (targetItem > 0) {
            index = arr.indexOf(targetItem)
        }

        // i < index 去掉一个数乘以2正好等于sum的
        if (index > 0 && i < index) {
            result.push(`(${arr[i]}, ${arr[index]})`)

            // 操作原数组，删除用到过的原数
            arr.splice(index, 1)
        }
        
    }

    return result
}

// console.log(findItems(arr, sum))
console.log(findItems(arr1, sum))