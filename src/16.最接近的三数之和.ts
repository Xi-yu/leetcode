/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode.cn/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (44.96%)
 * Likes:    1406
 * Dislikes: 0
 * Total Accepted:    472.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 *
 * 返回这三个数的和。
 *
 * 假定每组输入只存在恰好一个解。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0], target = 1
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 1000
 * -1000 <= nums[i] <= 1000
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
// 先排序，再查找
// 时间: O(n^2)
// 空间: O(logn)
function threeSumClosest(nums: number[], target: number): number {
  // 先排序
  nums.sort((a, b) => a - b);
  let ans = Number.MAX_SAFE_INTEGER;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let j = i + 1,
      k = len - 1;
    while (j < k) {
      const cur = nums[i] + nums[j] + nums[k];
      if (Math.abs(cur - target) < Math.abs(ans - target)) {
        // 如果这三个数的和更接近target，更新答案
        ans = cur;
      }
      if (cur >= target) {
        // 如果比target大，k左移
        k--;
      } else {
        // 如果比target小，j右移
        j++;
      }
    }
  }
  return ans;
}
// @lc code=end
