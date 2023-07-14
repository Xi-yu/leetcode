/*
 * @lc app=leetcode.cn id=120 lang=typescript
 *
 * [120] 三角形最小路径和
 *
 * https://leetcode.cn/problems/triangle/description/
 *
 * algorithms
 * Medium (68.69%)
 * Likes:    1235
 * Dislikes: 0
 * Total Accepted:    297.4K
 * Total Submissions: 433.3K
 * Testcase Example:  '[[2],[3,4],[6,5,7],[4,1,8,3]]'
 *
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 *
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1
 * 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
 * 输出：11
 * 解释：如下面简图所示：
 * ⁠  2
 * ⁠ 3 4
 * ⁠6 5 7
 * 4 1 8 3
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：triangle = [[-10]]
 * 输出：-10
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * triangle[0].length == 1
 * triangle[i].length == triangle[i - 1].length + 1
 * -10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？
 *
 *
 */

// @lc code=start
// dp
// 时间: O(n^2+n)
// 空间: O(n^2)
function minimumTotal1(triangle: number[][]): number {
  const len = triangle.length;
  // dp[i][j]表示移动到位置[i,j]的最小路径和，默认值是Number.MAX_SAFE_INTEGER
  const dp: number[][] = new Array(len)
    .fill(0)
    .map(() => new Array(len).fill(Number.MAX_SAFE_INTEGER));
  // [0,0]位置就是triangle[0][0]的值
  dp[0][0] = triangle[0][0];

  // 从第二行开始遍历
  for (let i = 1; i < len; i++) {
    // 每行只有i+1个数，所以只需要遍历到i
    for (let j = 0; j <= i; j++) {
      // 只有[i-1,j-1]和[i-1,j]两种情况可以到[i,j]
      // 所以选择这两种情况下路径和更小的那种情况
      // 需要注意j=0时，就只能从[i-1,j]位置移动过来
      if (j === 0) {
        dp[i][j] = triangle[i][j] + dp[i - 1][j];
      } else {
        dp[i][j] = triangle[i][j] + Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
      }
    }
  }

  let ans = Number.MAX_SAFE_INTEGER;
  // 遍历最后一行，找到最后一行中的最小值，即是答案
  for (const n of dp[len - 1]) {
    ans = Math.min(ans, n);
  }

  return ans;
}

// dp - 空间优化
// 时间: O(n^2+n)
// 空间: O(n)
function minimumTotal(triangle: number[][]): number {
  const len = triangle.length;
  // 因为每次计算当前位置的最小路径和，只需要上一行j和j-1的路径和，所以只需要一维数组即可
  const dp: number[] = new Array(len).fill(Number.MAX_SAFE_INTEGER);

  // [0]位置就是triangle[0][0]的值
  dp[0] = triangle[0][0];

  // 从第二行开始遍历
  for (let i = 1; i < len; i++) {
    // 每行只有i+1个数，所以只需要遍历到i
    // 因为计算j时，需要j-1的值，所以需要倒序遍历，这样j-1的值才是上一行的结果
    for (let j = i; j >= 0; j--) {
      // 只有[i-1,j-1]和[i-1,j]两种情况可以到[i,j]
      // 所以选择这两种情况下路径和更小的那种情况
      // 需要注意j=0时，就只能从[i-1,j]位置移动过来
      if (j === 0) {
        dp[j] += triangle[i][j];
      } else {
        dp[j] = triangle[i][j] + Math.min(dp[j - 1], dp[j]);
      }
    }
  }

  let ans = Number.MAX_SAFE_INTEGER;
  // 遍历最后一行，找到最后一行中的最小值，即是答案
  for (const n of dp) {
    ans = Math.min(ans, n);
  }

  return ans;
}
// @lc code=end
