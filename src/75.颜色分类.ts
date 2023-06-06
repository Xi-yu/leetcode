/*
 * @lc app=leetcode.cn id=75 lang=typescript
 *
 * [75] 颜色分类
 *
 * https://leetcode.cn/problems/sort-colors/description/
 *
 * algorithms
 * Medium (60.37%)
 * Likes:    1600
 * Dislikes: 0
 * Total Accepted:    539.1K
 * Total Submissions: 892.6K
 * Testcase Example:  '[2,0,2,1,1,0]'
 *
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 *
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 *
 *
 *
 *
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,0,1]
 * 输出：[0,1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 300
 * nums[i] 为 0、1 或 2
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
// 双指针两次遍历
// 时间: O(2n)
// 空间: O(1)
function sortColors1(nums: number[]): void {
  const n = nums.length;
  let i = -1; // 指向最后一个0所在的位置
  for (let j = 0; j < n; j++) {
    if (nums[j] === 0) {
      // 把所有0放到前面
      i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let j = i + 1; j < n; j++) {
    if (nums[j] === 1) {
      // 把所有1接在0的后面
      i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
}

// 三指针一次遍历
// 时间: O(n)
// 空间: O(1)
function sortColors(nums: number[]): void {
  const n = nums.length;
  let i = -1; // 指向最后一个0所在的位置
  let j = -1; // 指向最后一个1所在的位置
  for (let k = 0; k < n; k++) {
    if (nums[k] === 2) {
      continue;
    }
    if (nums[k] === 1) {
      j++;
      [nums[j], nums[k]] = [nums[k], nums[j]];
    } else {
      i++;
      j++;
      [nums[i], nums[k]] = [nums[k], nums[i]];
      if (i < j) {
        [nums[j], nums[k]] = [nums[k], nums[j]];
      }
    }
  }
}
// @lc code=end
