/*
 * @lc app=leetcode.cn id=213 lang=typescript
 *
 * [213] 打家劫舍 II
 *
 * https://leetcode.cn/problems/house-robber-ii/description/
 *
 * algorithms
 * Medium (44.12%)
 * Likes:    1383
 * Dislikes: 0
 * Total Accepted:    344.4K
 * Total Submissions: 780.2K
 * Testcase Example:  '[2,3,2]'
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈
 * ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,3,2]
 * 输出：3
 * 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,1]
 * 输出：4
 * 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 1000
 *
 *
 */

// @lc code=start
// dp - 按是否偷第一号，分为两次dp，返回更大的情况
// 时间: O(2n)
// 空间: O(n)
function rob1(nums: number[]): number {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const dp: number[] = new Array(len).fill(0);
  return Math.max(
    robRange1(nums, dp, 0, len - 2), // 要偷第1号，就不能偷最后一号
    robRange1(nums, dp, 1, len - 1) // 不偷第1号，就可以偷最后一号
  );
}
function robRange1(
  nums: number[],
  dp: number[],
  start: number,
  end: number
): number {
  dp[start] = nums[start];
  for (let i = start + 1; i <= end; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + (i - 2 >= start ? dp[i - 2] : 0));
  }
  return dp[end];
}

// dp - 按是否偷第一号，分为两次dp，返回更大的情况
// 空间优化
// 时间: O(2n)
// 空间: O(1)
function rob(nums: number[]): number {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  return Math.max(
    robRange(nums, 0, len - 2), // 要偷第1号，就不能偷最后一号
    robRange(nums, 1, len - 1) // 不偷第1号，就可以偷最后一号
  );
}
function robRange(nums: number[], start: number, end: number): number {
  let pprev = 0,
    prev = nums[start];
  for (let i = start + 1; i <= end; i++) {
    const temp = Math.max(prev, pprev + nums[i]);
    pprev = prev;
    prev = temp;
  }
  return prev;
}
// @lc code=end
