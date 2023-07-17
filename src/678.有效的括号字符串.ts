/*
 * @lc app=leetcode.cn id=678 lang=typescript
 *
 * [678] 有效的括号字符串
 *
 * https://leetcode.cn/problems/valid-parenthesis-string/description/
 *
 * algorithms
 * Medium (39.23%)
 * Likes:    596
 * Dislikes: 0
 * Total Accepted:    68.4K
 * Total Submissions: 174.4K
 * Testcase Example:  '"()"'
 *
 * 给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、')' 和 '*'。请你检验这个字符串是否为有效字符串，如果是有效字符串返回 true
 * 。
 *
 * 有效字符串符合如下规则：
 *
 *
 * 任何左括号 '(' 必须有相应的右括号 ')'。
 * 任何右括号 ')' 必须有相应的左括号 '(' 。
 * 左括号 '(' 必须在对应的右括号之前 ')'。
 * '*' 可以被视为单个右括号 ')' ，或单个左括号 '(' ，或一个空字符串。
 * 一个空字符串也被视为有效字符串。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "(*)"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "(*))"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s[i] 为 '('、')' 或 '*'
 *
 *
 */

// @lc code=start
// 栈
// 时间: O(2n)
// 空间: O(2n)
function checkValidString(s: string): boolean {
  // 保存'('下标的栈
  const stack1: number[] = [];
  // 保存'*'下标的栈
  const stack2: number[] = [];

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === ")") {
      // 优先跟'('栈抵消
      if (stack1.length > 0) {
        stack1.pop();
      } else if (stack2.length > 0) {
        // 其次再跟'*'栈抵消
        stack2.pop();
      } else {
        // 两个栈都为空的话，这个字符串一定不是有效的括号，结束遍历，返回false
        return false;
      }
    } else if (c === "(") {
      // 将下标位置入栈
      stack1.push(i);
    } else {
      // 将下标位置入栈
      stack2.push(i);
    }
  }

  // '('栈和'*'栈都不为空
  // 判断是否能相互抵消
  while (stack1.length > 0 && stack2.length > 0) {
    const i = stack1.pop() as number;
    const j = stack2.pop() as number;
    if (i > j) {
      // '*'必须在'('的后面，才能与'('抵消
      // 否则，返回false
      return false;
    }
  }
  // 遍历结束后，'('栈和'*'栈最多只有一个不为空
  // 如果'('栈为空，表示'('被抵消完了，返回true（'*'栈不为空也不影响）
  // 如果'('栈不为空，'*'栈一定为空，剩余的'('就无法抵消了，返回false
  return stack1.length === 0;
}
// @lc code=end
