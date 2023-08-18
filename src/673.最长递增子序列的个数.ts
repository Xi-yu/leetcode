/*
 * @lc app=leetcode.cn id=673 lang=typescript
 *
 * [673] 最长递增子序列的个数
 *
 * https://leetcode.cn/problems/number-of-longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (44.61%)
 * Likes:    781
 * Dislikes: 0
 * Total Accepted:    89.6K
 * Total Submissions: 200.3K
 * Testcase Example:  '[1,3,5,4,7]'
 *
 * 给定一个未排序的整数数组 nums ， 返回最长递增子序列的个数 。
 *
 * 注意 这个数列必须是 严格 递增的。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [1,3,5,4,7]
 * 输出: 2
 * 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
 *
 *
 * 示例 2:
 *
 *
 * 输入: [2,2,2,2,2]
 * 输出: 5
 * 解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
 *
 *
 *
 *
 * 提示:
 *
 *
 *
 *
 * 1 <= nums.length <= 2000
 * -10^6 <= nums[i] <= 10^6
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(2n)
function findNumberOfLIS(nums: number[]): number {
  const len = nums.length;
  // dp[i]表示：以nums[i]结尾时的最长上升子序列的长度（nums[i]必选）
  // 初始值为1：因为至少有一个长度为1的最长上升子序列（就是nums[i]自己）
  const dp: number[] = new Array(len).fill(1);
  // counts[i]表示：以nums[i]结尾时的最长上升子序列的个数，同理，初始值为1
  const counts: number[] = new Array(len).fill(1);
  let ans = 1,
    maxLength = 1;

  for (let i = 1; i < len; i++) {
    // 遍历0到i-1，如果nums[i]>nums[j]，那么dp[j]后面再加上nums[i]就是一种上升子序列
    // 然后dp[i]取dp[i]和dp[j]+1中更长的那个子序列，这样遍历结束，dp[i]就是最长的上升子序列
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          // dp[j]+1目前是最长的上升子序列
          counts[i] = counts[j];
          dp[i] = dp[j] + 1;
        } else if (dp[i] === dp[j] + 1) {
          // 又找到一个跟dp[i]一样长度的上升子序列
          counts[i] += counts[j];
        }
      }
    }
    // dp[i]确定了之后，再判断dp[i]是否是目前最长的上升子序列
    if (dp[i] > maxLength) {
      // dp[i]是目前最长的上升子序列，更新maxLength，重置ans
      maxLength = dp[i];
      ans = counts[i];
    } else if (dp[i] === maxLength) {
      // dp[i]与上一个最长上升子序列一样长度，更新ans
      ans += counts[i];
    }
  }

  return ans;
}
// @lc code=end
