/*
 * @lc app=leetcode.cn id=153 lang=typescript
 *
 * [153] 寻找旋转排序数组中的最小值
 *
 * https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (57.01%)
 * Likes:    954
 * Dislikes: 0
 * Total Accepted:    367.1K
 * Total Submissions: 643.9K
 * Testcase Example:  '[3,4,5,1,2]'
 *
 * 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7]
 * 在变化后可能得到：
 *
 * 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
 * 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
 *
 *
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2],
 * ..., a[n-2]] 。
 *
 * 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 *
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [3,4,5,1,2]
 * 输出：1
 * 解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2]
 * 输出：0
 * 解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [11,13,15,17]
 * 输出：11
 * 解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 5000
 * -5000 <= nums[i] <= 5000
 * nums 中的所有整数 互不相同
 * nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
 *
 *
 */

// @lc code=start
// 二分
// 时间: O(logn)
// 空间: O(1)
function findMin(nums: number[]): number {
  const length: number = nums.length;
  let left: number = 0,
    right: number = length - 1;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] < nums[right]) {
      // [mid, right]是升序
      // 最小值在[left, mid]内
      right = mid;
    } else {
      // [mid, right]不是升序, [left, mid]是升序
      // 最小值在[mid+1, right]内
      left = mid + 1;
    }
  }
  return nums[left];
}
// @lc code=end
