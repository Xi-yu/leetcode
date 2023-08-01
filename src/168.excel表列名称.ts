/*
 * @lc app=leetcode.cn id=168 lang=typescript
 *
 * [168] Excel表列名称
 *
 * https://leetcode.cn/problems/excel-sheet-column-title/description/
 *
 * algorithms
 * Easy (43.84%)
 * Likes:    640
 * Dislikes: 0
 * Total Accepted:    139.9K
 * Total Submissions: 318.9K
 * Testcase Example:  '1'
 *
 * 给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。
 *
 * 例如：
 *
 *
 * A -> 1
 * B -> 2
 * C -> 3
 * ...
 * Z -> 26
 * AA -> 27
 * AB -> 28
 * ...
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：columnNumber = 1
 * 输出："A"
 *
 *
 * 示例 2：
 *
 *
 * 输入：columnNumber = 28
 * 输出："AB"
 *
 *
 * 示例 3：
 *
 *
 * 输入：columnNumber = 701
 * 输出："ZY"
 *
 *
 * 示例 4：
 *
 *
 * 输入：columnNumber = 2147483647
 * 输出："FXSHRXW"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
// 暴力 - 相当于把十进制转为26进制，但是需要特殊处理26的倍数的情况，因为没有0
// 时间: O(log(26)n)
// 空间: O(1)
function convertToTitle(columnNumber: number): string {
  let ans = "";
  const mod = 26;

  while (columnNumber > 0) {
    // 减1是为了处理26的倍数
    const charIndex = (columnNumber - 1) % mod;
    ans = String.fromCharCode("A".charCodeAt(0) + charIndex) + ans;
    // 减1是为了处理26的倍数
    columnNumber = Math.floor((columnNumber - 1) / mod);
  }

  return ans;
}
// @lc code=end
