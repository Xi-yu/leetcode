/*
 * @lc app=leetcode.cn id=91 lang=typescript
 *
 * [91] 解码方法
 *
 * https://leetcode.cn/problems/decode-ways/description/
 *
 * algorithms
 * Medium (33.02%)
 * Likes:    1394
 * Dislikes: 0
 * Total Accepted:    272.1K
 * Total Submissions: 820.9K
 * Testcase Example:  '"12"'
 *
 * 一条包含字母 A-Z 的消息通过以下映射进行了 编码 ：
 *
 *
 * 'A' -> "1"
 * 'B' -> "2"
 * ...
 * 'Z' -> "26"
 *
 * 要 解码 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，"11106" 可以映射为：
 *
 *
 * "AAJF" ，将消息分组为 (1 1 10 6)
 * "KJF" ，将消息分组为 (11 10 6)
 *
 *
 * 注意，消息不能分组为  (1 11 06) ，因为 "06" 不能映射为 "F" ，这是由于 "6" 和 "06" 在映射中并不等价。
 *
 * 给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。
 *
 * 题目数据保证答案肯定是一个 32 位 的整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "12"
 * 输出：2
 * 解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "226"
 * 输出：3
 * 解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "06"
 * 输出：0
 * 解释："06" 无法映射到 "F" ，因为存在前导零（"6" 和 "06" 并不等价）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s 只包含数字，并且可能包含前导零。
 *
 *
 */

// @lc code=start
// 回溯递归：超时
// 时间: O(2^n)
// 空间: O(logn)
function numDecodings1(s: string): number {
  let ans: number = 0;
  const len: number = s.length;
  function backtrack(i: number) {
    if (i === len - 1) {
      // 顺利选完了，出来了一种答案
      ans++;
      return;
    }
    // 如果下一位不是0，就可以选一位
    if (i + 1 < len && s[i + 1] !== "0") {
      backtrack(i + 1);
    }
    // 如果下两位没有前导零 并且 没有超过26，就可以选两位
    if (
      i + 2 < len &&
      s[i + 1] !== "0" &&
      Number(s[i + 1]) * 10 + Number(s[i + 2]) <= 26
    ) {
      backtrack(i + 2);
    }
    // 否则，这一种选择路走不下去了
  }
  backtrack(-1);
  return ans;
}

// dp
// 时间: O(n)
// 空间: O(n)
function numDecodings(s: string): number {
  const len = s.length;
  const dp: number[] = new Array(len + 1).fill(0);
  dp[1] = s[0] === "0" ? 0 : 1;

  for (let i = 1; i <= len; i++) {
    let cur = 0;
    // 最后一次，选一个
    if (s[i] !== "0") {
      cur += dp[i - 1];
    }
    // 最后一次，选两个
    if (s[i - 1] !== "0" && Number(s[i - 1]) * 10 + Number(s[i]) <= 26) {
      cur += dp[i - 2];
    }
    dp[i] = cur;
  }

  return dp[len];
}
// @lc code=end
