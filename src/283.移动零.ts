/*
 * @lc app=leetcode.cn id=283 lang=typescript
 *
 * [283] 移动零
 *
 * https://leetcode.cn/problems/move-zeroes/description/
 *
 * algorithms
 * Easy (63.82%)
 * Likes:    1996
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 1.6M
 * Testcase Example:  '[0,1,0,3,12]'
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [0]
 * 输出: [0]
 *
 *
 *
 * 提示:
 *
 *
 *
 * 1 <= nums.length <= 10^4
 * -2^31 <= nums[i] <= 2^31 - 1
 *
 *
 *
 *
 * 进阶：你能尽量减少完成的操作次数吗？
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
// 暴力模拟
// 时间: O(n^2)
// 空间: O(1)
function moveZeroes1(nums: number[]): void {
  let length: number = nums.length;
  let i = 0;
  while (i < length) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      length--;
    } else {
      i++;
    }
  }
}

// 双指针
// 时间: O(n)
// 空间: O(1)
function moveZeroes(nums: number[]): void {
  const length = nums.length;
  // 左指针i左边的数字不包含0
  // 左指针i和右指针j之间全是0
  let i = 0,
    j = 0;
  while (j < length) {
    if (nums[j] !== 0) {
      if (i !== j) {
        // 右指针遇到不是0时, 就跟左指针交换
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
      i++;
    }
    j++;
  }
}
// @lc code=end
