/*
 * @lc app=leetcode.cn id=96 lang=typescript
 *
 * [96] 不同的二叉搜索树
 *
 * https://leetcode.cn/problems/unique-binary-search-trees/description/
 *
 * algorithms
 * Medium (70.85%)
 * Likes:    2292
 * Dislikes: 0
 * Total Accepted:    375.4K
 * Total Submissions: 529.8K
 * Testcase Example:  '3'
 *
 * 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：5
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2)
// 空间: O(n)
function numTrees(n: number): number {
  // dp[i]表示，i个节点(1到i)，可以组成多少个不同的二叉搜索树
  // 注意，这里有一个特性：[1,2,3]和[3,4,5]可以组成不同二叉搜索树的数量是一样的
  // 只要节点数量一样，可组成不同二叉搜索树的数量是一样的
  const dp: number[] = new Array(n + 1).fill(0);
  // 0个节点和1个节点，都只有一种二叉搜索树
  dp[0] = dp[1] = 1;

  // 从2开始遍历
  for (let i = 2; i <= n; i++) {
    // 遍历以每个节点为根节点时，有多少中不同二叉搜索树的情况
    // 所有情况之和，就是dp[i]
    for (let j = 1; j <= i; j++) {
      // 以j为根节点时，左子树可组成的不同二叉搜索树数量为dp[j-1]
      // 右子树可组成的不同二叉搜索树数量为dp[i-j]
      // 左右子树的数量相乘 即是 j为根节点时的数量
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
}
// @lc code=end
