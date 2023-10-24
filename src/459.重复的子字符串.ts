/*
 * @lc app=leetcode.cn id=459 lang=typescript
 *
 * [459] 重复的子字符串
 *
 * https://leetcode.cn/problems/repeated-substring-pattern/description/
 *
 * algorithms
 * Easy (51.13%)
 * Likes:    1065
 * Dislikes: 0
 * Total Accepted:    214.6K
 * Total Submissions: 417.7K
 * Testcase Example:  '"abab"'
 *
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abab"
 * 输出: true
 * 解释: 可由子串 "ab" 重复两次构成。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "aba"
 * 输出: false
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "abcabcabcabc"
 * 输出: true
 * 解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 *
 * 1 <= s.length <= 10^4
 * s 由小写英文字母组成
 *
 *
 */

// @lc code=start
// 暴力枚举
// 时间: O(n^2)
// 空间: O(1)
function repeatedSubstringPattern(s: string): boolean {
  const n = s.length;

  for (let i = 1; i <= n / 2; i++) {
    // 字符串长度一定是子串长度的整数倍数
    if (n % i === 0) {
      let match = true;
      // 一定有s[j]===s[j%i] i<=j<n
      for (let j = i; j < n; j++) {
        if (s[j] !== s[j % i]) {
          match = false;
          break;
        }
      }
      if (match) {
        return true;
      }
    }
  }

  return false;
}
// @lc code=end
