/*
 * @lc app=leetcode.cn id=560 lang=typescript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (45.22%)
 * Likes:    1920
 * Dislikes: 0
 * Total Accepted:    316.6K
 * Total Submissions: 701.5K
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 *
 *
 */

// @lc code=start
// 模拟
// 时间: O(n^2)
// 空间: O(1)
function subarraySum1(nums: number[], k: number): number {
  let ans: number = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum: number = 0;
    for (let j = i; j >= 0; j--) {
      // [j,i]连续子数组的和
      sum += nums[j];
      if (sum === k) {
        ans++;
      }
    }
  }
  return ans;
}

// 前缀和+hash表
// 时间: O(n)
// 空间: O(n)
function subarraySum(nums: number[], k: number): number {
  const hash = new Map([[0, 1]]);
  let sum = 0;
  let ans = 0;
  for (const n of nums) {
    sum += n;
    ans += hash.get(sum - k) || 0;
    hash.set(sum, (hash.get(sum) || 0) + 1);
  }
  return ans;
}
// @lc code=end
