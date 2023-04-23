/*
 * @lc app=leetcode.cn id=14 lang=typescript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode.cn/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (43.24%)
 * Likes:    2747
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2.5M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
// 将第一个和第二个比较得出公共前缀
// 再将得到的公共前缀和第三个比较，得到新的公共前缀
// 以此类推，全部比较完，得到最长的公共前缀
// 时间: O(mn) m=strs.length n=strs[0].length
// 空间: O(1)
function longestCommonPrefix(strs: string[]): string {
  let ans: string = strs[0];
  const n = strs.length;
  for (let i = 1; i < n; i++) {
    ans = getCommonPrefix(ans, strs[i]);
    if (ans === "") {
      // 如果存在没有公共前缀的情况
      // 后面的无需继续比较，直接返回
      break;
    }
  }
  return ans;
}

function getCommonPrefix(str1: string, str2: string): string {
  let ans: string = "";
  let i = 0;
  while (i < str1.length && i < str2.length) {
    if (str1[i] !== str2[i]) {
      break;
    }
    ans += str1[i];
    i++;
  }
  return ans;
}
// @lc code=end
