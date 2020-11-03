/* 
    let arr = [1,23,5,[2,5,6],[4,5,[3,2]]]

    实现：
        实现扁平化
        实现数组去重
        冒泡算法排序
*/

const arr = [1,23,5,[2,5,6],[4,5,[3,2]]];

/* 
    数组扁平化
*/
const list = arr.flat(Infinity)
console.log(list);


/* 
    数组去重
*/
const list1 = [...new Set(list)]
console.loj(list1)


/* 
  冒泡算法排序  
*/
function jssort(myArr) {
    //要循环多少次
	for (let i = 0; i < myArr.length - 1; i++) {
        console.log(`第${i}次`);
        
        //要移动几次
		for (let j = 0; j < myArr.length - 1; j++) {
			if (myArr[j] > myArr[j + 1]) {
                // 数组解构
				[myArr[j], myArr[j + 1]] = [myArr[j + 1], myArr[j]]
            }
            
			console.log(list1);
		}
    }
    
	return myArr;
}
console.log(jssort(list1))
