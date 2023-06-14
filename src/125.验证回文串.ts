/*
 * @lc app=leetcode.cn id=125 lang=typescript
 *
 * [125] 验证回文串
 *
 * https://leetcode.cn/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (46.46%)
 * Likes:    643
 * Dislikes: 0
 * Total Accepted:    474.8K
 * Total Submissions: 1M
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 *
 * 字母和数字都属于字母数字字符。
 *
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 * 解释："amanaplanacanalpanama" 是回文串。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "race a car"
 * 输出：false
 * 解释："raceacar" 不是回文串。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = " "
 * 输出：true
 * 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
 * 由于空字符串正着反着读都一样，所以是回文串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 2 * 10^5
 * s 仅由可打印的 ASCII 字符组成
 *
 *
 */

// @lc code=start
// 利用回文串倒序后不变来判断
// 时间: O(n)
// 空间: O(n)
function isPalindrome1(s: string): boolean {
  let str = "";
  let reverseStr = "";

  for (const c of s) {
    const lowerC = c.toLowerCase();
    if (isLetterOrNumber(lowerC)) {
      str += lowerC;
      reverseStr = lowerC + reverseStr;
    }
  }

  return str === reverseStr;
}

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const zero = "0".charCodeAt(0);
const nine = "9".charCodeAt(0);
function isLetterOrNumber(c: string): boolean {
  const cc = c.charCodeAt(0);
  return (cc >= zero && cc <= nine) || (cc >= a && cc <= z);
}

// 前后双指针
// 时间: O(n)
// 空间: O(1)
function isPalindrome(s: string): boolean {
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    while (i < j && !isLetterOrNumber(s[i].toLowerCase())) {
      i++;
    }
    while (i < j && !isLetterOrNumber(s[j].toLowerCase())) {
      j--;
    }
    if (i > j) {
      return false;
    }
    if (s[i].toLowerCase() !== s[j].toLowerCase()) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
// @lc code=end
