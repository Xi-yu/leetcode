/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 *
 * https://leetcode.cn/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (37.51%)
 * Likes:    6420
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 3.7M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(n^2)
function longestPalindrome1(s: string): string {
  const len = s.length;
  if (len < 2) {
    return s;
  }
  // dp[i][j]表示字符串s下标i到下标j的子串是否为回文（包括i和j）
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(false));
  let start = 0, // 最长回文的开始下标(包括)
    end = 0; // 最长回文的结束下标(包括)
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        // 一个字符，肯定是回文
        dp[i][j] = true;
      } else if (j - i === 1) {
        // 两个字符，相同就是回文，不同就不是回文
        dp[i][j] = s[i] === s[j];
      } else {
        // 大于两个字符
        // 两头字符相同 并且 去掉两头后还是回文，就是回文
        // 否则，不是回文
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }
      if (dp[i][j] && j - i > end - start) {
        // 是回文并且更长的话，更新起止下标
        end = j;
        start = i;
      }
    }
  }
  return s.slice(start, end + 1);
}

// 中心扩展
// 时间: O(n^2)
// 空间: O(1)
function longestPalindrome(s: string): string {
  const len = s.length;
  if (len < 2) {
    return s;
  }
  let start = 0,
    end = 0;
  for (let i = 0; i < len - 1; i++) {
    if (end - start + 1 === len) {
      // 如果已经找到一种扩展，表示s本来就是回文字串，就不需要在扩展其他情况了
      break;
    }
    // 从一个字符开始，两边同时不断向外扩展一个字符，返回最长回文字串的左右下标
    const [left1, right1] = expendAroundCenter(s, i, i);
    // 从两个字符开始，两边同时不断向外扩展一个字符，返回最长回文字串的左右下标
    const [left2, right2] = expendAroundCenter(s, i, i + 1);
    if (right1 - left1 > end - start) {
      end = right1;
      start = left1;
    }
    if (right2 - left2 > end - start) {
      end = right2;
      start = left2;
    }
  }
  return s.slice(start, end + 1);
}
function expendAroundCenter(s: string, left: number, right: number): number[] {
  const len = s.length;
  let i = left,
    j = right;
  while (i >= 0 && j < len && i <= j && s[i] === s[j]) {
    i--;
    j++;
  }
  return j - i === 1 ? [++i, j] : [++i, --j];
}
// @lc code=end
