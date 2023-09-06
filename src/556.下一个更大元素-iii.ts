/*
 * @lc app=leetcode.cn id=556 lang=typescript
 *
 * [556] 下一个更大元素 III
 *
 * https://leetcode.cn/problems/next-greater-element-iii/description/
 *
 * algorithms
 * Medium (36.91%)
 * Likes:    335
 * Dislikes: 0
 * Total Accepted:    47.1K
 * Total Submissions: 128K
 * Testcase Example:  '12'
 *
 * 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
 *
 * 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：21
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 21
 * 输出：-1
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
// 单调栈：是一个下标对应数字不递减的单调栈；+ 局部排序
// 倒叙遍历
// 如果当前数字大于等于栈顶下标对应元素，就push下标进栈
// 如果当前数字小于栈顶元素，就将两个下标对应的数字调换，然后组成一个数字，就可以得到答案
// 时间: O(logn+n(logn)^2+logn)
// 空间: O(2logn)
function nextGreaterElement(n: number): number {
  const max = Math.pow(2, 31) - 1;

  // 将n的每位数字倒序拆成一个数组
  const nums: number[] = [];
  let cur = n;
  while (cur > 0) {
    nums.push(cur % 10);
    cur = Math.floor(cur / 10);
  }

  // 单调栈：是一个下标对应数字不递减的单调栈
  const stack: number[] = [];
  // 先将下标0 push进去
  stack.push(0);
  // 保存交换的下标
  let j = -1;
  // 从下标1开始遍历
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] >= nums[stack[stack.length - 1]]) {
      // 如果当前数字大于等于栈顶下标对应元素，就push下标进栈
      stack.push(i);
    } else {
      // 如果当前数字小于栈顶元素，就将两个下标对应的数字调换
      while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
        j = stack.pop() as number;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]];
      //将i左边的数重新降序排列
      const temp = nums.slice(0, i).sort((a, b) => b - a);
      for (let k = 0; k < i; k++) {
        nums[k] = temp[k];
      }
      break;
    }
  }

  if (j === -1) {
    // 说明没有找到可以交换的下标
    return -1;
  }

  // 将nums合并起来
  for (let i = nums.length - 1; i >= 0; i--) {
    // cur此时为0，就没有再声明变量了，用cur正合适
    cur = cur * 10 + nums[i];
    if (cur > max) {
      // 超过32位整数
      return -1;
    }
  }

  return cur;
}
// @lc code=end
