/*
 * @lc app=leetcode.cn id=300 lang=typescript
 *
 * [300] 最长递增子序列
 *
 * https://leetcode.cn/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (54.67%)
 * Likes:    3323
 * Dislikes: 0
 * Total Accepted:    771.5K
 * Total Submissions: 1.4M
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7]
 * 的子序列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2500
 * -10^4 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(n)
function lengthOfLIS1(nums: number[]): number {
  const len = nums.length;
  // dp[i]: 以第i位结尾时的最长递增子序列的长度(第i位必选), 初始值为1
  const dp: number[] = new Array(len).fill(1);
  let ans = 1;

  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // 将第i位与前面所有比较
      // 如果第j位的数字，就取dp[j]+1与dp[i]的较大者
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 更新答案
    ans = Math.max(ans, dp[i]);
  }

  return ans;
}

// 贪心: 如果要上升子序列尽可能的长，就要上升的尽可能的慢
// 时间: O(n^2)
// 空间: O(n)
function lengthOfLIS2(nums: number[]): number {
  const len = nums.length;
  // dp[i]: 长度为i的最长上升子序列的末尾元素的最小值
  const dp: number[] = new Array(len + 1).fill(Number.MIN_SAFE_INTEGER);
  dp[1] = nums[0]; // 长度为1的末尾元素初始为num[0]

  let ans = 1; // 目前最长上升子序列的长度

  for (let i = 1; i < len; i++) {
    if (nums[i] > dp[ans]) {
      dp[++ans] = nums[i];
    } else {
      // 正序遍历，从dp[1]到dp[ans]之中，找到满足d[j−1]<nums[i]<d[j]的下标j，更新dp[j]=nums[i]
      // 因为dp[0]是Number.MIN_SAFE_INTEGER，所以一定能找到满足上面条件的j
      for (let j = 1; j <= ans; j++) {
        if (dp[j - 1] < nums[i] && dp[j] > nums[i]) {
          dp[j] = nums[i];
          break;
        }
      }
    }
  }

  return ans;
}

// 贪心+二分: 因为dp是单调递增的，所以可以使用二分查找来降低时间复杂度
// 时间: O(nlogn)
// 空间: O(n)
function lengthOfLIS(nums: number[]): number {
  const len = nums.length;
  const dp: number[] = new Array(len + 1).fill(Number.MIN_SAFE_INTEGER);
  dp[1] = nums[0];
  let ans = 1;

  for (let i = 1; i < len; i++) {
    if (nums[i] > dp[ans]) {
      dp[++ans] = nums[i];
    } else {
      // 从dp[1]到dp[ans]中，二分查找找到最后一个小于nums[i]的dp[j]，更新dp[j+1]=nums[i]
      let left = 1,
        right = ans,
        pos = 0; // 初始值为0，如果dp[1]到dp[ans]之间没有小于nums[i]，就用nums[i]替换dp[1]
      while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (dp[mid] < nums[i]) {
          pos = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      dp[pos + 1] = nums[i];
    }
  }

  return ans;
}
// @lc code=end
