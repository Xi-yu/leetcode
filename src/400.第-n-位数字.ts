/*
 * @lc app=leetcode.cn id=400 lang=typescript
 *
 * [400] 第 N 位数字
 *
 * https://leetcode.cn/problems/nth-digit/description/
 *
 * algorithms
 * Medium (45.65%)
 * Likes:    381
 * Dislikes: 0
 * Total Accepted:    58.5K
 * Total Submissions: 128.1K
 * Testcase Example:  '3'
 *
 * 给你一个整数 n ，请你在无限的整数序列 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n
 * 位上的数字。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 11
 * 输出：0
 * 解释：第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 0 ，它是 10 的一部分。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2^31 - 1
 *
 *
 */

// @lc code=start
// 根据规律计算
// 时间: O(log10(n))
// 空间: O(1)
function findNthDigit(n: number): number {
  // 一位数的个数：9，一位数的位数：9*1
  // 两位数的个数：90，两位数的位数：90*2
  // 三位数的个数：900，三位数的位数：900*3
  // 四位数的个数：9000，四位数的位数：9000*4
  // 五位数的个数：90000，五位数的位数：90000*5
  // 以此类推...
  let digit = 1; // 第n位数字所在数字的位数，初始值为1

  // 循环找到第n位数字所在数字的位数
  // 时间: O(log10(n))  空间: O(1)
  while (n > 9 * digit * Math.pow(10, digit - 1)) {
    n -= 9 * digit * Math.pow(10, digit - 1);
    digit++;
  }

  // 计算属于哪个数字
  let target = Math.pow(10, digit - 1) + Math.floor((n - 1) / digit);

  // 计算是该数字中的第几个数字，从0开始
  let i = (n - 1) % digit;

  // 返回target的第i个数字
  // 先将i后面的数字去掉
  // 然后再跟10取余
  return Math.floor(target / Math.pow(10, digit - i - 1)) % 10;
}
// @lc code=end
