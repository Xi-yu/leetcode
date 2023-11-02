/*
 * @lc app=leetcode.cn id=115 lang=typescript
 *
 * [115] 不同的子序列
 *
 * https://leetcode.cn/problems/distinct-subsequences/description/
 *
 * algorithms
 * Hard (52.26%)
 * Likes:    1153
 * Dislikes: 0
 * Total Accepted:    154.9K
 * Total Submissions: 301.1K
 * Testcase Example:  '"rabbbit"\n"rabbit"'
 *
 * 给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数，结果需要对 10^9 + 7 取模。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "rabbbit", t = "rabbit"
 * 输出：3
 * 解释：
 * 如下所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
 * rabbbit
 * rabbbit
 * rabbbit
 *
 * 示例 2：
 *
 *
 * 输入：s = "babgbag", t = "bag"
 * 输出：5
 * 解释：
 * 如下所示, 有 5 种可以从 s 中得到 "bag" 的方案。
 * babgbag
 * babgbag
 * babgbag
 * babgbag
 * babgbag
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length, t.length <= 1000
 * s 和 t 由英文字母组成
 *
 *
 */

// @lc code=start
// dp
// 时间: O(m+m*n)
// 空间: O(m*n)
function numDistinct(s: string, t: string): number {
  const m = s.length;
  const n = t.length;
  if (n > m) {
    // t比s长，t不可能是s的子序列
    return 0;
  }
  const mod = Math.pow(10, 9) + 7;
  // dp[i][j]: s[i:]中t[j:]出现的个数
  const dp: number[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0));
  // 空字符串不包含任何非空子序列
  // s[m:]为空字符串，dp[m][j] = 0 (0<=j<n)
  // 任何字符串中都包含一个空字符子序列
  // t[n:]为空字符串，dp[i][n] = 1 (0<=i<=m)
  for (let i = 0; i <= m; i++) {
    dp[i][n] = 1;
  }

  for (let i = m - 1; i >= 0; i--) {
    // t[j:]的长度不能超过s[i:]的长度
    for (let j = n - 1; j >= 0 && n - j <= m - i; j--) {
      if (s[i] === t[j]) {
        dp[i][j] = (dp[i + 1][j + 1] + dp[i + 1][j]) % mod;
      } else {
        dp[i][j] = dp[i + 1][j];
      }
    }
  }

  return dp[0][0];
}
// @lc code=end
// s = "babgbag", t = "bag"
// [   0  1  2  3
//0   [0, 0, 0, 1],
//1   [0, 0, 0, 1],
//2   [0, 0, 0, 1],
//3   [0, 0, 0, 1],
//4   [0, 0, 0, 1],
//5   [0, 0, 0, 1],
//6   [0, 0, 0, 1],
//7   [0, 0, 0, 1],
// ];
