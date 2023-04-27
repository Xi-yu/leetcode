/*
 * @lc app=leetcode.cn id=227 lang=typescript
 *
 * [227] 基本计算器 II
 *
 * https://leetcode.cn/problems/basic-calculator-ii/description/
 *
 * algorithms
 * Medium (44.45%)
 * Likes:    689
 * Dislikes: 0
 * Total Accepted:    146.7K
 * Total Submissions: 330.1K
 * Testcase Example:  '"3+2*2"'
 *
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 *
 * 整数除法仅保留整数部分。
 *
 * 你可以假设给定的表达式总是有效的。所有中间结果将在 [-2^31, 2^31 - 1] 的范围内。
 *
 * 注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "3+2*2"
 * 输出：7
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = " 3/2 "
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = " 3+5 / 2 "
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 3 * 10^5
 * s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
 * s 表示一个 有效表达式
 * 表达式中的所有整数都是非负整数，且在范围 [0, 2^31 - 1] 内
 * 题目数据保证答案是一个 32-bit 整数
 *
 *
 */

// @lc code=start
// 栈，乘除优先计算
// 时间: O()
// 空间: O()
function calculate(s: string): number {
  // 如果当前字符是'+'，将后面的数字，push到stack中
  // 如果当前字符是'-'，将后面的数字的负数，push到stack中
  // 如果当前字符是'*'，将后面的数字与栈顶数字相乘后的结果，更新栈顶元素
  // 如果当前字符是'/'，将后面的数字与栈顶数字相除并向下取整后的结果，更新栈顶元素
  // 最后再遍历stack，将所有数字相加，得到答案
  const stack: number[] = [];
  let ans: number = 0;
  let cur: number = 0;
  let prevOpe: string = "+";
  for (let i = 0; i < s.length; ) {
    while (s[i] === " ") {
      i++;
    }
    while (
      !(
        s[i] === "+" ||
        s[i] === "-" ||
        s[i] === "*" ||
        s[i] === "/" ||
        s[i] === " "
      ) &&
      i < s.length
    ) {
      cur = cur * 10 + (s[i].charCodeAt(0) - "0".charCodeAt(0));
      i++;
    }
    switch (prevOpe) {
      case "+":
        stack.push(cur);
        break;
      case "-":
        stack.push(-cur);
        break;
      case "*":
        stack.push((stack.pop() || 0) * cur);
        break;
      case "/":
        // 题目要求只保留整数部分
        // 正数: 向下取整
        // 负数: 向上取整
        const temp = (stack.pop() || 0) / cur;
        stack.push(temp > 0 ? Math.floor(temp) : Math.ceil(temp));
        break;
      default:
    }
    prevOpe = s[i];
    i++;
    cur = 0;
  }
  // 再遍历一次，把所有数字相加，得到答案
  for (const n of stack) {
    ans += n;
  }
  return ans;
}
// @lc code=end
