/*
 * @lc app=leetcode.cn id=516 lang=typescript
 *
 * [516] 最长回文子序列
 *
 * https://leetcode.cn/problems/longest-palindromic-subsequence/description/
 *
 * algorithms
 * Medium (67.13%)
 * Likes:    1124
 * Dislikes: 0
 * Total Accepted:    205K
 * Total Submissions: 305.5K
 * Testcase Example:  '"bbbab"'
 *
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
 *
 * 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "bbbab"
 * 输出：4
 * 解释：一个可能的最长回文子序列为 "bbbb" 。
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出：2
 * 解释：一个可能的最长回文子序列为 "bb" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(n^2)
function longestPalindromeSubseq(s: string): number {
  const len = s.length;
  // dp[i][j]: s[i,j]的最长回文子序列(len>j>=i>=0)
  const dp: number[][] = new Array(len)
    .fill(0)
    .map(() => new Array(len).fill(0));

  // 因为dp[i][j]与dp[i][j-1]、dp[i+1][j-1]和dp[i+1][j]有关
  // 所以i需要倒着遍历
  for (let i = len - 1; i >= 0; i--) {
    // s[i,i]: 一个字符的最长回文子序列就是它自己
    dp[i][i] = 1;
    for (let j = i + 1; j < len; j++) {
      if (s[i] === s[j]) {
        // 如果s[i]===s[j]
        // 则dp[i][j]就是去掉收尾相同字符后的最长回文子序列的长度+2
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        // 否则
        // dp[i][j]就是去掉收尾字符其中一个后的最长回文子序列的较大者
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][len - 1];
}
