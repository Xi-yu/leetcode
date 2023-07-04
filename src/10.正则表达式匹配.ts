/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 *
 * https://leetcode.cn/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (30.83%)
 * Likes:    3630
 * Dislikes: 0
 * Total Accepted:    374.4K
 * Total Submissions: 1.2M
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *
 *
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 *
 *
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aa", p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
 *
 *
 * 示例 2:
 *
 *
 * 输入：s = "aa", p = "a*"
 * 输出：true
 * 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "ab", p = ".*"
 * 输出：true
 * 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 20
 * 1 <= p.length <= 20
 * s 只包含从 a-z 的小写字母。
 * p 只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 保证每次出现字符 * 时，前面都匹配到有效的字符
 *
 *
 */

// @lc code=start
// dp
// 时间: O(mn)
// 空间: O(mn)
function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  const matches = (i: number, j: number): boolean => {
    if (i === 0) {
      // s的第0位是空字符串，与p中的任意非0位置都不匹配
      return false;
    }
    if (p[j - 1] === ".") {
      return true;
    }
    return s[i - 1] === p[j - 1];
  };

  // s的前i位与p的前j位是否匹配(i和j都从1开始)
  const dp: boolean[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(false));

  // 特殊情况: s的前0位和p的前0位 是匹配的
  dp[0][0] = true;

  // i需要从0开始遍历，因为存在''与'.*'匹配的情况
  for (let i = 0; i <= m; i++) {
    // p的前0位和s的前非0位一定不匹配，所以j从1开始遍历
    for (let j = 1; j <= n; j++) {
      // 因为下标是从0开始的，所以需要j - 1
      if (p[j - 1] === "*") {
        // 如果p的第j个字符(下标j-1)是 '*'
        // p的第一位不可能是'*'，所以 j >= 2，所以 j - 2 >= 0
        if (matches(i, j - 1)) {
          // 如果s的第i位和p的第j-1位匹配
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j];
        } else {
          // 如果s的第i位和p的第j-1位不匹配
          dp[i][j] = dp[i][j - 2];
        }
      } else {
        // 如果p的第j个字符是 '.' 或者 小写字母
        if (matches(i, j)) {
          // 如果s的第i位和p的第j位匹配
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          // 如果s的第i位和p的第j位不匹配
          // 这一步可以省略，因为dp中的默认值都是false
          dp[i][j] = false;
        }
      }
    }
  }

  return dp[m][n];
}
// @lc code=end
