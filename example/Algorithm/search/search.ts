/**
 * @二分搜索
 *   数字第一次出现的位置（R = M）
 *   数字最后一次出现的位置 （L = M)
 * @数组三问
 *      1. sorted?
 *      2. duplicated?
 *      3. negative?
 */

/**
 * @平方根SQRT
 */

export const mySqrt = (n: number): number => {
    n = ~~n; // 取整数部分

    if (n < 0) return NaN;
    if (n === 0) return 0;

    let left = 1, right = n;
    
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        let quotient = Math.floor(n / mid)
        if (mid === quotient) return mid;

        if (mid < quotient) {
            left = mid + 1; 
        } else {
            right = mid - 1;
        }
        
        console.log(left, right);
    }
    return right;
}

console.log(mySqrt(43));
