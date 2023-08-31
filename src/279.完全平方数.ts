/*
 * @lc app=leetcode.cn id=279 lang=typescript
 *
 * [279] 完全平方数
 *
 * https://leetcode.cn/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (66.05%)
 * Likes:    1799
 * Dislikes: 0
 * Total Accepted:    430.2K
 * Total Submissions: 648.8K
 * Testcase Example:  '12'
 *
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 *
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11
 * 不是。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 *
 * 示例 2：
 *
 *
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^4
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(n)
function numSquares1(n: number): number {
  // dp[i]: 和为i(0<i<=n)的完全平方数的最小数量, 默认为i(最坏情况完全平方数全是1)
  const dp: number[] = new Array(n + 1).fill(0).map((_, i) => i);

  for (let i = 1; i <= n; i++) {
    if (Math.sqrt(i) % 1 === 0) {
      // 如果根号i是整数, 那么和为i的完全平方数的最小数量为1(完全平方数就是一个i)
      dp[i] = 1;
    } else {
      // dp[i]=Math.min(dp[j]+dp[i-j])  0<j<i
      for (let j = 1; j < i; j++) {
        dp[i] = Math.min(dp[i], dp[j] + dp[i - j]);
      }
    }
  }

  return dp[n];
}

// dp - 优化
// 时间: O()
// 空间: O()
function numSquares(n: number): number {}
// @lc code=end
