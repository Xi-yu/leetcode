/*
 * @lc app=leetcode.cn id=494 lang=typescript
 *
 * [494] 目标和
 *
 * https://leetcode.cn/problems/target-sum/description/
 *
 * algorithms
 * Medium (48.75%)
 * Likes:    1782
 * Dislikes: 0
 * Total Accepted:    390.9K
 * Total Submissions: 807.2K
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给你一个非负整数数组 nums 和一个整数 target 。
 *
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 *
 *
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 *
 *
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], target = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 20
 * 0 <= nums[i] <= 1000
 * 0 <= sum(nums[i]) <= 1000
 * -1000 <= target <= 1000
 *
 *
 */

// @lc code=start
// 回溯递归
// 时间: O(2^n)
// 空间: O(n)
function findTargetSumWays1(nums: number[], target: number): number {
  let ans = 0;

  const backtrack = (i: number, cur: number) => {
    if (i === nums.length) {
      // 完成了一种表达式
      if (cur === target) {
        ans++;
      }
      return;
    }
    backtrack(i + 1, cur + nums[i]);
    backtrack(i + 1, cur - nums[i]);
  };

  backtrack(0, 0);

  return ans;
}

// dp
// 时间: O(n+n*neg)
// 空间: O(n*neg)
function findTargetSumWays2(nums: number[], target: number): number {
  let sum = 0;
  for (const n of nums) {
    sum += n;
  }
  const neg = (sum - target) / 2; // 前面加负号的数字的和
  if (neg < 0 || neg % 1 !== 0) {
    // 因为nums是非负整数数组
    // 从nums中选择一些数的和neg也一定是非负整数
    // 否则，任何情况都不可能得到target
    return 0;
  }

  const len = nums.length;
  // dp[i][j]: 在nums中前i个数字中，选择任意数字并且和为j的方案数
  const dp: number[][] = new Array(len + 1)
    .fill(0)
    .map(() => new Array(neg + 1).fill(0));

  for (let i = 0; i < len + 1; i++) {
    for (let j = 0; j < neg + 1; j++) {
      if (i === 0) {
        // 前0个数字时
        if (j === 0) {
          // 和为0的方案数只有1种
          dp[i][j] = 1;
        } else {
          // 和不为0的方案没有
          dp[i][j] = 0;
        }
      } else {
        if (nums[i - 1] > j) {
          // 如果第i个数字大于j，那么第i个数字不能被选，所以与前i-1个数字的方案数一样
          dp[i][j] = dp[i - 1][j];
        } else {
          // 否则，就是不选第i个数字和为j的方案数: dp[i-1][j]
          // +
          // 选第i个数字和为j-nums[i-1]的方案数: dp[i-1][j-nums[i-1]]
          dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]];
        }
      }
    }
  }

  return dp[len][neg];
}

// dp+空间优化
// 时间: O(n+n*neg)
// 空间: O(neg)
function findTargetSumWays(nums: number[], target: number): number {
  let sum = 0;
  for (const n of nums) {
    sum += n;
  }

  const neg = (sum - target) / 2;
  if (neg < 0 || neg % 1 !== 0) {
    return 0;
  }

  const len = nums.length;
  const dp = new Array(neg + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= len; i++) {
    // 需要倒序遍历，这样才能确保dp[j-nums[i-1]]是i-1的结果
    for (let j = neg; j >= 0; j--) {
      if (j >= nums[i - 1]) {
        dp[j] += dp[j - nums[i - 1]];
      }
    }
  }

  return dp[neg];
}
// @lc code=end
