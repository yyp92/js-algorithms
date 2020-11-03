// 浏览器事件机制
console.log(1);
setTimeout(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});
new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});
process.nextTick(() => {
  console.log(6);
});
setTimeout(() => {
  console.log(9);
  process.nextTick(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(12);
  });
});



// this指向
// 资料：https://juejin.im/post/6844904040900329479
const obj = {
    a: function() {
        console.log(this)

        // 第一个this是obj对象，第二个this还是obj对象
        // 因为里面是箭头函数
        // window.setTimeout(() => { 
        //     console.log(this) 
        // }, 1000)

        // 第一个this是obj对象，第二个this => window
        // 因为里面是普通函数
        window.setTimeout(function() { 
            console.log(this) 
        }, 1000)
    }
}
obj.a.call(obj)


function side(arr) {
    arr[0] = arr[2];
}
function a(a, b, c = 3) {
    c = 10;
    console.log('----arguments', arguments)
    side(arguments);
    console.log('---', a, b, c)
    return a + b + c;
}
console.log(a(1, 1, 1));


(function () {
    var a = (b = 5);
  })();
  console.log(b);
  console.log(a);



var numList = [1,8,6,2,5,4,8,3,7]
var maxArea = function(height) {
    var i = 0, j = height.length - 1, max = 0
    while (i < j) {
      console.log('====', i, j)
        max = Math.max(max, (j - i) * (height[i] > height[j] ? height[j--]: height[i++]))
    }
    return max
};
// maxArea(numList)
console.log(maxArea(numList))

var nums = [3,2,2,3];
var val = 3;
var removeElement = function(nums, val) {
  var res = nums.filter(function(item) {
      return item !== val;
  });

  return res;
};

console.log('----', removeElement(nums, val))

var aa = [1, 2, 3, 3, 3, 4, 4]
var removeDuplicates = function(nums) {
  var j = 0;
  var n = nums.length;
  for(let i = 1;i<n;i++){
      if(nums[i]!=nums[i-1]){
          j++;
          nums[j] = nums[i];
      }
  }
  console.log('----nums', nums)
  return j+1;
};

console.log('removeDuplicates', removeDuplicates(aa))