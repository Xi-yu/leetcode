/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 *
 * https://leetcode.cn/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (69.04%)
 * Likes:    1485
 * Dislikes: 0
 * Total Accepted:    425.1K
 * Total Submissions: 616.3K
 * Testcase Example:  '[73,74,75,71,69,72,76,73]'
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i
 * 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 *
 *
 * 示例 2:
 *
 *
 * 输入: temperatures = [30,40,50,60]
 * 输出: [1,1,1,0]
 *
 *
 * 示例 3:
 *
 *
 * 输入: temperatures = [30,60,90]
 * 输出: [1,1,0]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= temperatures.length <= 10^5
 * 30 <= temperatures[i] <= 100
 *
 *
 */

// @lc code=start
// 暴力倒序模拟遍历
// 时间: O(n^2)
// 空间: O(1)
function dailyTemperatures1(temperatures: number[]): number[] {
  const length: number = temperatures.length;
  const ans: number[] = new Array(length).fill(0);
  for (let i = length - 2; i >= 0; i--) {
    for (let j = i + 1; j < length; j++) {
      if (temperatures[j] > temperatures[i]) {
        ans[i] = j - i;
        break;
      }
    }
  }
  return ans;
}

// 单调栈
// 时间: O(n)
// 空间: O(n)
function dailyTemperatures(temperatures: number[]): number[] {
  const length: number = temperatures.length;
  const ans: number[] = new Array(length).fill(0);
  const stack: number[] = []; // 从栈底到栈顶，是单调不增的
  for (let i = 0; i < length; i++) {
    if (
      stack.length === 0 ||
      temperatures[i] <= temperatures[stack[stack.length - 1]]
    ) {
      // 如果栈为空，或者当天的温度小于等于栈顶的温度，则入栈
      stack.push(i);
    } else {
      // 否则，从栈顶不断pop，判断栈顶温度是否小于当前天的温度，直到不小于当前天温度为止
      while (
        stack.length > 0 &&
        temperatures[stack[stack.length - 1]] < temperatures[i]
      ) {
        const j = stack.pop() as number;
        ans[j] = i - j;
      }
      // 循环结束的条件：要么是栈空了；要么是找到第一个栈顶温度大于等于当前天温度
      // 循环结束后再把当前天入栈
      stack.push(i);
    }
  }
  return ans;
}
// @lc code=end
