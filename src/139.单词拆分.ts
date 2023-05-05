/*
 * @lc app=leetcode.cn id=139 lang=typescript
 *
 * [139] 单词拆分
 *
 * https://leetcode.cn/problems/word-break/description/
 *
 * algorithms
 * Medium (54.08%)
 * Likes:    2103
 * Dislikes: 0
 * Total Accepted:    434.8K
 * Total Submissions: 803.8K
 * Testcase Example:  '"leetcode"\n["leet","code"]'
 *
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
 *
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 *
 *
 * 示例 2：
 *
 *
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 * 注意，你可以重复使用字典中的单词。
 *
 *
 * 示例 3：
 *
 *
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 300
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 20
 * s 和 wordDict[i] 仅有小写英文字母组成
 * wordDict 中的所有字符串 互不相同
 *
 *
 */

// @lc code=start
// dp
// dp[i]表示s[0:i]的子字符串是否能由字典拼出, 状态转移方程有两种情况:
// 1、s[0:i]在字典中
// 2、s[j:i]在字典中, 并且dp[j-1]为true, 0<=j<=i
// 时间: O(n+n^2)
// 空间: O(n+n)
function wordBreak(s: string, wordDict: string[]): boolean {
  // 将数组转为Set, 这样每次查找的时间复杂度为O(1)
  const hash = new Set(wordDict);
  const len = s.length;
  const dp = new Array(len).fill(false);
  dp[0] = hash.has(s[0]);
  for (let i = 1; i < len; i++) {
    let j = i;
    // 用临时变量保存子字符串
    // 用String.slice()或者String.substring()时间复杂度应该会更高, 感觉是O(n), 但是google没有找到这两个api的时间复杂度
    let tempStr = s[j];
    while (j >= 0) {
      if (hash.has(tempStr) && (j === 0 || dp[j - 1])) {
        dp[i] = true;
        break;
      }
      j--;
      tempStr = (s[j] || "") + tempStr;
    }
  }
  return dp[len - 1];
}
// @lc code=end
