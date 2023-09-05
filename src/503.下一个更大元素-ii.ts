/*
 * @lc app=leetcode.cn id=503 lang=typescript
 *
 * [503] 下一个更大元素 II
 *
 * https://leetcode.cn/problems/next-greater-element-ii/description/
 *
 * algorithms
 * Medium (66.67%)
 * Likes:    857
 * Dislikes: 0
 * Total Accepted:    211.2K
 * Total Submissions: 315.3K
 * Testcase Example:  '[1,2,1]'
 *
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的
 * 下一个更大元素 。
 *
 * 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1
 * 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,1]
 * 输出: [2,-1,2]
 * 解释: 第一个 1 的下一个更大的数是 2；
 * 数字 2 找不到下一个更大的数；
 * 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1,2,3,4,3]
 * 输出: [2,3,4,-1,4]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 10^4
 * -10^9 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
// 暴力
// 时间: O(n^2)
// 空间: O(1)
function nextGreaterElements1(nums: number[]): number[] {
  const len = nums.length;
  const ans: number[] = new Array(len).fill(-1);

  for (let i = 0; i < len; i++) {
    // 从i+1开始，找到第一个大于nums[i]的数
    // 因为是循环数组，所以找到结尾没有找到的话，再从0到i-1里面找一遍
    for (let j = i + 1; j < len + i; j++) {
      if (nums[j % len] > nums[i]) {
        // 如果找到了，就退出循环
        ans[i] = nums[j % len];
        break;
      }
    }
  }

  return ans;
}

// 单调栈
// 时间: O(2n)
// 空间: O(2n)
function nextGreaterElements(nums: number[]): number[] {
  const len = nums.length;
  const ans: number[] = new Array(len).fill(-1);
  // 栈中保存下标，从栈底到栈顶对应下标的数是单调不升的
  const stack: number[] = [];

  // 因为是循环数组，所以只从0遍历到len-1是不够的
  // 每个位置i都需要从i+1遍历到i-1的位置，在这个区间内找到下一个更大的值
  // 但是不能超过len*2-1，最多遍历两遍，如果遍历两遍都找不到的话，就是-1
  for (let i = 0; i < len * 2 - 1; i++) {
    // 将所有大于nums[i]的数都弹出
    // 这些弹出的下标对应的下一个更大的数，就是nums[i]
    while (
      stack.length > 0 &&
      nums[i % len] > nums[stack[stack.length - 1] % len]
    ) {
      ans[(stack.pop() as number) % len] = nums[i % len];
    }
    stack.push(i);
  }

  return ans;
}
// @lc code=end
