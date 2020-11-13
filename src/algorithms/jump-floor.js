/* 
斐波那契数列：
    Fn = Fn-1 + Fn-2; (n >= 2)
    就是费波那契数列由0和1开始，之后的费波那契系数就是由之前的两数相加而得出;
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233……（OEIS中的数列A000045）
    特别指出：0不是第一项，而是第零项。

分析：
    楼梯为4阶：5
        1   1   1   1
            1   2   1
            1   1   2
            2   1   1
                2   2 
    楼梯为3阶：3
        1   1   1
            2   1
            1   2
    楼梯为2阶：2
        1   1
            2 
    楼梯为1阶：1
        1

由此得出：假设最后跨1阶，爬之前的台阶的方法为n-1阶楼梯的方法；如果跨2阶，那么爬之前的台阶就有n-2阶楼梯的方法。我们可以假设爬楼梯的方法函数为f();台阶数为n;那么：f(n)=f(n-1)+f(n-2);其实可以发现，随着楼梯数n的增加，爬法总数呈现斐波那契数列规律增加。那么我们是否可以设置爬一阶楼梯的方法为1，爬二阶楼梯的方法为2.这样当台阶数>2时，我们只需要循环相加就可以了。
*/

/* 
题目：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
*/
function jumpFloor(n) {
    if (n == 1) {
        return 1;
    }

    if (n == 2) {
        return 2;
    }

    let ret = 0;
    let pre = 2;
    let prepre = 1;

    for (let i = 3; i <= n; i++) {
        // 当前楼梯数方法总是前两个楼梯数方法之和
        ret = pre + prepre;
        prepre = pre;
        pre = ret;  
    }

    // test
    console.log('ret:', ret);
    return ret;
}
jumpFloor(5)
