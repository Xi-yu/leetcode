/*
 * @lc app=leetcode.cn id=162 lang=typescript
 *
 * [162] 寻找峰值
 *
 * https://leetcode.cn/problems/find-peak-element/description/
 *
 * algorithms
 * Medium (49.30%)
 * Likes:    1035
 * Dislikes: 0
 * Total Accepted:    297.9K
 * Total Submissions: 604.1K
 * Testcase Example:  '[1,2,3,1]'
 *
 * 峰值元素是指其值严格大于左右相邻值的元素。
 *
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 *
 * 你可以假设 nums[-1] = nums[n] = -∞ 。
 *
 * 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,1]
 * 输出：2
 * 解释：3 是峰值元素，你的函数应该返回其索引 2。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,1,3,5,6,4]
 * 输出：1 或 5
 * 解释：你的函数可以返回索引 1，其峰值元素为 2；
 * 或者返回索引 5， 其峰值元素为 6。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * -2^31 <= nums[i] <= 2^31 - 1
 * 对于所有有效的 i 都有 nums[i] != nums[i + 1]
 *
 *
 */

// @lc code=start
// 首先明确一点，因为nums[-1]和nums[length]是负无穷，并且相邻两数不同，所以峰值元素一定存在
// 直接遍历比较
// 从左到右遍历，因为相邻的数字不相等，所以找到第一个nums[i] > nums[i + 1]，i就是答案
// 时间: O(n)
// 空间: O(1)
function findPeakElement1(nums: number[]): number {
  let ans = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[ans] > nums[i]) {
      // 当前数字如果比前一个数字小，找到了，退出循环
      break;
    }
    // 更新前一个数字
    ans = i;
  }
  return ans;
}

// 迭代爬坡
// 时间: O(n)
// 空间: O(1)
function findPeakElement2(nums: number[]): number {
  const len = nums.length;
  // 随机选择一个下标，将该下标与左右数字比较
  // 如果：nums[index-1] < nums[index] > nums[index+1]，该下标就是答案之一
  // 如果：nums[index-1] < nums[index] < nums[index+1]，右边是‘爬坡’，继续往右边查找
  // 如果：nums[index-1] > nums[index] > nums[index+1]，左边是‘爬坡’，继续往左边查找
  // 如果：nums[index-1] > nums[index] < nums[index+1]，左右都是‘爬坡’，随便往哪边走
  let index = Math.floor(Math.random() * len);

  // 退出循环条件：找到了比左边大，并且比右边大的数字
  while (
    !(
      get(nums, index) > get(nums, index - 1) &&
      get(nums, index) > get(nums, index + 1)
    )
  ) {
    if (
      get(nums, index) > get(nums, index - 1) &&
      get(nums, index) < get(nums, index + 1)
    ) {
      // 右边是‘爬坡’，继续往右边查找
      index++;
    } else {
      // 左边是‘爬坡’，继续往左边查找
      index--;
    }
  }
  return index;
}
// 需要注意index-1可能会是-1，index+1可能会是len
// 封装一个函数对这两种情况需要特殊处理
// -1或者len，返回负无穷
function get(nums, i) {
  if (i === -1 || i === nums.length) {
    return -Infinity;
  }
  return nums[i];
}

// 对迭代爬坡进行二分查找优化
// 时间: O(logn)
// 空间: O(1)
function findPeakElement(nums: number[]): number {
  const len = nums.length;
  let left = 0,
    right = len - 1;
  let ans = -1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (
      get(nums, mid) > get(nums, mid - 1) &&
      get(nums, mid) > get(nums, mid + 1)
    ) {
      // 找到了，退出循环
      ans = mid;
      break;
    }
    if (
      get(nums, mid) > get(nums, mid - 1) &&
      get(nums, mid) < get(nums, mid + 1)
    ) {
      // 右边是‘爬坡’，二分查找[mid + 1, right]
      left = mid + 1;
    } else {
      // 左边是‘爬坡’，二分查找[left, mid - 1]
      right = mid - 1;
    }
  }
  return ans;
}
// @lc code=end
