/*
 * @lc app=leetcode.cn id=97 lang=typescript
 *
 * [97] 交错字符串
 *
 * https://leetcode.cn/problems/interleaving-string/description/
 *
 * algorithms
 * Medium (44.77%)
 * Likes:    946
 * Dislikes: 0
 * Total Accepted:    128.6K
 * Total Submissions: 288.2K
 * Testcase Example:  '"aabcc"\n"dbbca"\n"aadbbcbcac"'
 *
 * 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
 *
 * 两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：
 *
 *
 * s = s1 + s2 + ... + sn
 * t = t1 + t2 + ... + tm
 * |n - m| <= 1
 * 交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 +
 * ...
 *
 *
 * 注意：a + b 意味着字符串 a 和 b 连接。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：s1 = "", s2 = "", s3 = ""
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s1.length, s2.length <= 100
 * 0 <= s3.length <= 200
 * s1、s2、和 s3 都由小写英文字母组成
 *
 *
 *
 *
 * 进阶：您能否仅使用 O(s2.length) 额外的内存空间来解决它?
 *
 */

// @lc code=start
// 回溯递归 - 超时
// 时间: O(2^n)
// 空间: O(n)
function isInterleave1(s1: string, s2: string, s3: string): boolean {
  const l = s1.length;
  const m = s2.length;
  const n = s3.length;
  // s3的长度一定等于s1的长度和s2的长度之和
  if (l + m !== n) {
    return false;
  }

  function backtrack(i: number, j: number, k: number): boolean {
    if (i === l && j === m && k === n) {
      // 顺利匹配完
      return true;
    }
    if (s1[i] !== s3[k] && s2[j] !== s3[k]) {
      // 这种匹配方式无法进行下去
      return false;
    }
    let flag = false;
    if (s1[i] === s3[k]) {
      // 将s1的i+1位字母和s3的k+1位字母进行匹配
      flag = backtrack(i + 1, j, k + 1);
    }
    if (s2[j] === s3[k] && !flag) {
      // 上面没有匹配成功，回溯回来，将s2的J+1位字母和s3的k+1位字母进行匹配
      flag = backtrack(i, j + 1, k + 1);
    }
    return flag;
  }

  return backtrack(0, 0, 0);
}

// dp
// 时间: O(l*m)
// 空间: O(l*m)
function isInterleave2(s1: string, s2: string, s3: string): boolean {
  const l = s1.length;
  const m = s2.length;
  const n = s3.length;
  // s3的长度一定等于s1的长度和s2的长度之和
  if (l + m !== n) {
    return false;
  }

  // dp[i][j]: s1的前i个字符和s2的前j个字符是否能交错组成s3的前i+j个字符
  const dp: boolean[][] = new Array(l + 1)
    .fill(false)
    .map(() => new Array(m + 1).fill(false));

  // ''和''一定能交错组成''
  // 所以，s1的前0个字符和s2的前0个字符是否能交错组成s3的前0个字符
  dp[0][0] = true;

  for (let i = 0; i <= l; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0 && j === 0) continue;
      if (i === 0) {
        // s2的前j-1个字符和s3的前j-1个字符相同，并且s2的第j个字符和s3的第j个字符相同
        dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (j === 0) {
        // s1的前i-1个字符和s3的前i-1个字符相同，并且s1的第i个字符和s3的第i个字符相同
        dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      } else {
        // 如果s1的第i位字符和s3的第i+j位字符相同，则看s1的前i-1位字符和s2的前j位字符是否能交错组成s3的前i-1+j位字符
        // 否则，如果s2的第j位字符和s3的第i+j位字符相同，则看s1的前i位字符和s2的前j-1位字符是否能交错组成s3的前i+j-1位字符
        // 上面两个只要满足一种，就表示s1的前i位和s2的前j位可以交错组成s3的前i+j位
        dp[i][j] =
          (s1[i - 1] === s3[i + j - 1] && dp[i - 1][j]) ||
          (s2[j - 1] === s3[i + j - 1] && dp[i][j - 1]);
      }
    }
  }

  return dp[l][m];
}

// dp+滚动数组空间优化
// 时间: O(l*m)
// 空间: O(m)
function isInterleave(s1: string, s2: string, s3: string): boolean {
  const l = s1.length;
  const m = s2.length;
  const n = s3.length;
  // s3的长度一定等于s1的长度和s2的长度之和
  if (l + m !== n) {
    return false;
  }

  const dp: boolean[] = new Array(m + 1).fill(false);

  // ''和''一定能交错组成''
  // 所以，s1的前0个字符和s2的前0个字符是否能交错组成s3的前0个字符
  dp[0] = true;

  for (let i = 0; i <= l; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0 && j === 0) continue;
      if (i === 0) {
        // s2的前j-1个字符和s3的前j-1个字符相同，并且s2的第j个字符和s3的第j个字符相同
        dp[j] = dp[j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (j === 0) {
        // s1的前i-1个字符和s3的前i-1个字符相同，并且s1的第i个字符和s3的第i个字符相同
        dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
      } else {
        // 如果s1的第i位字符和s3的第i+j位字符相同，则看s1的前i-1位字符和s2的前j位字符是否能交错组成s3的前i-1+j位字符
        // 否则，如果s2的第j位字符和s3的第i+j位字符相同，则看s1的前i位字符和s2的前j-1位字符是否能交错组成s3的前i+j-1位字符
        // 上面两个只要满足一种，就表示s1的前i位和s2的前j位可以交错组成s3的前i+j位
        dp[j] =
          (s1[i - 1] === s3[i + j - 1] && dp[j]) ||
          (s2[j - 1] === s3[i + j - 1] && dp[j - 1]);
      }
    }
  }

  return dp[m];
}
// @lc code=end
// 'aabcc'
// 'dbbca'
// 'aadbbbaccc'
// [      j=0    1      2      3      4      5
// i=0  [true, false, false, false, false, false],
// i=1  [true, false, false, false, false, false],
// i=2  [true, true, true, true, false, false],
// i=3  [false, true, true, true, false, false],
// i=4  [false, false, false, false, false, false],
// i=5  [false, false, false, false, false, false],
// ];
