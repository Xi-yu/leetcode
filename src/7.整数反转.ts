/*
 * @lc app=leetcode.cn id=7 lang=typescript
 *
 * [7] 整数反转
 *
 * https://leetcode.cn/problems/reverse-integer/description/
 *
 * algorithms
 * Medium (35.39%)
 * Likes:    3837
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 3.4M
 * Testcase Example:  '123'
 *
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 123
 * 输出：321
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = -123
 * 输出：-321
 *
 *
 * 示例 3：
 *
 *
 * 输入：x = 120
 * 输出：21
 *
 *
 * 示例 4：
 *
 *
 * 输入：x = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * -2^31
 *
 *
 */

// @lc code=start
// 模拟
// 时间: O(log|x|)
// 空间: O(1)
function reverse(x: number): number {
  // 不能超过[-2147483648,2147483647]的范围
  const MAX = Math.pow(2, 31); // 2147483648

  let ans = 0;
  let cur = Math.abs(x);
  const isMinus = cur !== x;

  while (cur > 0) {
    // 因为题目要求不能使用64位整数
    // 所以不能先更新ans，再判断ans是否超过32位整数范围
    // 所以要先判断
    if (Math.floor(MAX / 10) < ans) {
      // ans*10超过了范围
      return 0;
    }
    if (MAX - ans * 10 < cur % 10) {
      // ans * 10 + (cur % 10)超过了范围
      return 0;
    }
    ans = ans * 10 + (cur % 10);
    cur = Math.floor(cur / 10);
  }

  return isMinus ? -ans : ans;
}
// @lc code=end
