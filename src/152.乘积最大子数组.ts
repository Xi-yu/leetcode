/*
 * @lc app=leetcode.cn id=152 lang=typescript
 *
 * [152] 乘积最大子数组
 *
 * https://leetcode.cn/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (43.10%)
 * Likes:    2009
 * Dislikes: 0
 * Total Accepted:    355.6K
 * Total Submissions: 824.9K
 * Testcase Example:  '[2,3,-2,4]'
 *
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 *
 * 测试用例的答案是一个 32-位 整数。
 *
 * 子数组 是数组的连续子序列。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * -10 <= nums[i] <= 10
 * nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n)
// 空间: O(n)
function maxProduct1(nums: number[]): number {
  const length = nums.length;
  // dp[i][0]: 以第i位结尾时的最大乘积
  // dp[i][1]: 以第i位结尾时的最小乘积
  const dp: number[][] = new Array(length)
    .fill(0)
    .map(() => new Array(2).fill(0));
  dp[0][0] = nums[0];
  dp[0][1] = nums[0];
  let ans: number = dp[0][0];
  for (let i = 1; i < length; i++) {
    // 只选择第i位
    const temp1 = nums[i];
    // 第i位 * 第i-1位的最大乘积
    const temp2 = nums[i] * dp[i - 1][0];
    // 第i位 * 第i-1位的最小乘积
    const temp3 = nums[i] * dp[i - 1][1];
    // 以第i位结尾时的最大乘积:
    dp[i][0] = Math.max(temp1, temp2, temp3);
    // 以第i位结尾时的最小乘积:
    dp[i][1] = Math.min(temp1, temp2, temp3);
    // 更新答案
    ans = Math.max(ans, dp[i][0]);
  }
  return ans;
}

// dp - 空间优化
// 时间: O(n)
// 空间: O(1)
function maxProduct(nums: number[]): number {
  const length: number = nums.length;
  let prevMax: number = nums[0];
  let prevMin: number = nums[0];
  let ans: number = prevMax;
  for (let i = 1; i < length; i++) {
    const temp1 = nums[i];
    const temp2 = nums[i] * prevMax;
    const temp3 = nums[i] * prevMin;
    prevMax = Math.max(temp1, temp2, temp3);
    prevMin = Math.min(temp1, temp2, temp3);
    ans = Math.max(ans, prevMax);
  }
  return ans;
}
// @lc code=end
