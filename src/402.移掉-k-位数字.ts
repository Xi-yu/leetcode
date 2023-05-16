/*
 * @lc app=leetcode.cn id=402 lang=typescript
 *
 * [402] 移掉 K 位数字
 *
 * https://leetcode.cn/problems/remove-k-digits/description/
 *
 * algorithms
 * Medium (31.86%)
 * Likes:    952
 * Dislikes: 0
 * Total Accepted:    134.6K
 * Total Submissions: 423.1K
 * Testcase Example:  '"1432219"\n3'
 *
 * 给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。
 *
 *
 * 示例 1 ：
 *
 *
 * 输入：num = "1432219", k = 3
 * 输出："1219"
 * 解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
 *
 *
 * 示例 2 ：
 *
 *
 * 输入：num = "10200", k = 1
 * 输出："200"
 * 解释：移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
 *
 *
 * 示例 3 ：
 *
 *
 * 输入：num = "10", k = 2
 * 输出："0"
 * 解释：从原数字移除所有的数字，剩余为空就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * num 仅由若干位数字（0 - 9）组成
 * 除了 0 本身之外，num 不含任何前导零
 *
 *
 */

// @lc code=start
// 单调栈：栈底到栈顶单调不降
// 时间: O(n)
// 空间: O(n)
function removeKdigits(num: string, k: number): string {
  const length = num.length;
  const stack: number[] = [];
  let i = 0;
  while (i < length) {
    const cur = num[i].charCodeAt(0) - "0".charCodeAt(0);
    // 如果栈为不为空 并且 当前数字小于栈顶 并且 还没有删除k个数字
    while (stack.length > 0 && k > 0 && stack[stack.length - 1] > cur) {
      stack.pop();
      k--;
    }
    stack.push(cur);
    i++;
  }
  // 可能遍历完时没有删除到k个数字
  while (k > 0) {
    stack.pop();
    k--;
  }
  let ans = "0";
  for (const v of stack) {
    if (ans === "0") {
      // 如果存在前缀0
      ans = "";
    }
    ans += String(v);
  }
  return ans;
}
// @lc code=end
