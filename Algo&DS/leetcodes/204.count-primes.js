/*
 * @lc app=leetcode id=204 lang=javascript
 *
 * [204] Count Primes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    let count = 0;
    let l = Math.floor(n / 32) + 1;
    let arr = [];
    for (let i = 0; i < l; i++) {
        arr.push(0);   
    }
    
    for (let i = 2; i < n; i++) {
        if ((arr[Math.floor(i / 32)] & (1 << (i & 31))) !== 0) continue;
        ++count;
        for (let j = i + i; j < n; j += i) {
            arr[Math.floor(j / 32)] |= 1 << (j & 31);
        }
    }
    return count;
};
// @lc code=end

