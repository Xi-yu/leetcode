/*
 * @lc app=leetcode.cn id=50 lang=typescript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode.cn/problems/powx-n/description/
 *
 * algorithms
 * Medium (38.02%)
 * Likes:    1178
 * Dislikes: 0
 * Total Accepted:    376.4K
 * Total Submissions: 990.2K
 * Testcase Example:  '2.00000\n10'
 *
 * 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，x^n^ ）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 *
 *
 * 示例 3：
 *
 *
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2^-2 = 1/2^2 = 1/4 = 0.25
 *
 *
 *
 *
 * 提示：
 *
 *
 * -100.0 < x < 100.0
 * -2^31 <= n <= 2^31-1
 * n 是一个整数
 * 要么 x 不为零，要么 n > 0 。
 * -10^4 <= x^n <= 10^4
 *
 *
 */

// @lc code=start
// 不断平方模拟
// 时间: O(logn)
// 空间: O(1)
function myPow(x: number, n: number): number {
  if (n === 0 || x === 1) {
    return 1;
  }
  const isNegative = n < 0;
  n = Math.abs(n);
  let ans: number = x;
  let i = 1; // 计数，乘了几个x了
  while (i * 2 <= n) {
    // 如果还可以平方，就平方
    ans *= ans;
    i *= 2;
  }
  // 剩下的不能平方的次数，再一个个的乘
  while (i < n) {
    ans *= x;
    i++;
  }
  return isNegative ? 1 / ans : ans;
}
// @lc code=end
