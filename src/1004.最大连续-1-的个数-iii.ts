/*
 * @lc app=leetcode.cn id=1004 lang=typescript
 *
 * [1004] 最大连续1的个数 III
 *
 * https://leetcode.cn/problems/max-consecutive-ones-iii/description/
 *
 * algorithms
 * Medium (59.78%)
 * Likes:    589
 * Dislikes: 0
 * Total Accepted:    128.8K
 * Total Submissions: 216.7K
 * Testcase Example:  '[1,1,1,0,0,0,1,1,1,1,0]\n2'
 *
 * 给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
 * 输出：6
 * 解释：[1,1,1,0,0,1,1,1,1,1,1]
 * 粗体数字从 0 翻转到 1，最长的子数组长度为 6。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
 *             [1,2,2,2,3,4,4,4,4,5,5,5,6,7,8,8,8,8,8]
 * 输出：10
 * 解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
 * 粗体数字从 0 翻转到 1，最长的子数组长度为 10。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * nums[i] 不是 0 就是 1
 * 0 <= k <= nums.length
 *
 *
 */

// @lc code=start
// 暴力
// 时间: O(n^2)
// 空间: O(1)
function longestOnes1(nums: number[], k: number): number {
  let ans = 0;
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    // 遍历找到每个端点i对应的最大的右端点j，使得左右端点之间[i,j]的0的个数小于等于k
    // 最大的那个j-i+1，就是答案
    if (len - i <= ans) {
      // 如果剩余的还未遍历的数量小于等于ans，就不用再遍历了，因为不可能找到大于ans的了
      break;
    }
    let j = i,
      n = k;
    // 找到包含不超过k个0的右端点
    while (j < len && n >= 0) {
      if (nums[j] === 0) {
        n--;
        if (n < 0) {
          j--;
          break;
        }
      }
      j++;
    }
    if (j > len - 1) {
      j = len - 1;
    }

    ans = Math.max(ans, j - i + 1);
  }

  return ans;
}

// 滑动窗口+前缀和
// 时间: O(2n)
// 空间: O(n)
function longestOnes2(nums: number[], k: number): number {
  const len = nums.length;
  const sums: number[] = new Array(len + 1).fill(0);
  sums[1] = nums[0] === 0 ? 1 : 0;

  // 0变1，1变0，生成前缀和
  // [i,j]区间内0的个数 = sums[j] - sums[i-1]
  for (let i = 1; i < len; i++) {
    if (nums[i] === 0) {
      sums[i + 1] = sums[i] + 1;
    } else {
      sums[i + 1] = sums[i];
    }
  }

  let ans = 0;

  // 双指针，滑动窗口
  for (let i = 1, j = 1; j <= len; ) {
    if (sums[j] - sums[i - 1] <= k) {
      // 如果[i,j]区间没有超过k个0，j向右移动
      // 并且更新答案
      ans = Math.max(ans, j - i + 1);
      j++;
    } else if (i <= j) {
      // 如果[i,j]区间超过k个0，并且i<=j，i向右移动
      i++;
    } else {
      // 否则，j向右移动，看后面还有没有不超过k个0的区间
      j++;
    }
  }

  return ans;
}
// @lc code=end
