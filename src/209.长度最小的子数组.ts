/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (46.98%)
 * Likes:    1704
 * Dislikes: 0
 * Total Accepted:    538.7K
 * Total Submissions: 1.1M
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 *
 */

// @lc code=start
// 前缀和+二分查找
// 时间: O(nlogn)
// 空间: O(n)
function minSubArrayLen1(target: number, nums: number[]): number {
  const length: number = nums.length;
  // 前缀和
  const sums: number[] = new Array(length).fill(0);
  sums[0] = nums[0];
  for (let i = 1; i < length; i++) {
    sums[i] = sums[i - 1] + nums[i];
  }
  let ans: number = 0;
  for (let i = 0; i < length; i++) {
    // 二分查找
    let left = i,
      right = length - 1;
    while (left <= right) {
      const mid = left + ((right - left) >>> 1);
      const cur = sums[mid] - (i > 0 ? sums[i - 1] : 0);
      if (cur >= target) {
        // 更新答案，继续查找[left,mid-1]
        ans = ans === 0 ? mid - i + 1 : Math.min(ans, mid - i + 1);
        right = mid - 1;
      } else {
        // 继续查找[mid+1,right]
        left = mid + 1;
      }
    }
  }
  return ans;
}

// 滚动数组
// 时间: O(n)
// 空间: O(1)
function minSubArrayLen(target: number, nums: number[]): number {
  const length: number = nums.length;
  let ans: number = 0;
  let sum: number = nums[0]; // [0,0]的和
  // 滑动窗口（双指针）
  for (let i = 0, j = 0; i < length && j < length; ) {
    if (sum >= target) {
      // 如果[i,j]的和大于等于target，先更新答案
      ans = ans === 0 ? j - i + 1 : Math.min(ans, j - i + 1);
      // 然后右移左指针，缩小滑动窗口的大小，继续判断
      sum -= nums[i];
      i++;
    } else {
      // 否则，右移右指针，增大滑动窗口的大小，继续判断
      j++;
      sum += nums[j];
    }
  }
  return ans;
}
// @lc code=end
