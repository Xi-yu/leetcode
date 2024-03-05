/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (39.09%)
 * Likes:    10002
 * Dislikes: 0
 * Total Accepted:    2.7M
 * Total Submissions: 6.8M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 5 * 10^4
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
// 双指针滑动窗口+哈希表
// 时间: O(2n)
// 空间: O(m) 可能出现的字符数量，不超过128
function lengthOfLongestSubstring(s: string): number {
  const n = s.length;
  if (n === 0) return 0;
  let left = 0;
  let right = 1;
  let ans = 1;
  const hash = new Set(s[0]);

  while (right < n) {
    while (right < n && !hash.has(s[right])) {
      // 找到没有重复字符的右边界
      hash.add(s[right]);
      right++;
    }
    ans = Math.max(ans, right - left); // 更新答案
    while (hash.has(s[right])) {
      // 移动左边界，直到子串没有重复字符
      hash.delete(s[left]);
      left++;
    }
  }

  return ans;
}
// @lc code=end
// au
// left = 0
// right = 2
// ans = 1
// hash=[a,u]
