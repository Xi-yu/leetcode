/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (42.35%)
 * Likes:    2267
 * Dislikes: 0
 * Total Accepted:    776.6K
 * Total Submissions: 1.8M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
// 一次二分查找，然后左右扩展找到左右下标
// 时间: O(logn), 如果数组中的数字都等于target,时间复杂度需要O(n)
// 空间: O(1)
function searchRange1(nums: number[], target: number): number[] {
  const ans: number[] = [-1, -1];
  const n: number = nums.length;
  let left: number = 0,
    right: number = n - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      let i = mid,
        j = mid;
      while (i >= left && nums[i] === target) {
        i--;
      }
      while (j <= right && nums[j] === target) {
        j++;
      }
      ans[0] = i + 1;
      ans[1] = j - 1;
      break;
    }
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}

// 两次二分查找，找到左右下标
// 时间: O(2logn)
// 空间: O(1)
function searchRange(nums: number[], target: number): number[] {
  const n: number = nums.length;
  const ans: number[] = [-1 - 1];
  // 第一次二分查找
  let left: number = 0,
    right: number = n - 1;
  while (left < right) {}

  // 第二次二分查找
  left = 0;
  right = n - 1;
  while (left < right) {}
  return ans;
}
// @lc code=end
