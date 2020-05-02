/**
 * 198 打家劫舍
 */
export function rob(money: number[]) {
    if (!money || !money.length) return 0;

    const len = money.length;
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = money[0];
    for (let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + money[i - 1]);
    }
    return dp[len];
}