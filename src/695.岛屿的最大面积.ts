/*
 * @lc app=leetcode.cn id=695 lang=typescript
 *
 * [695] 岛屿的最大面积
 *
 * https://leetcode.cn/problems/max-area-of-island/description/
 *
 * algorithms
 * Medium (68.02%)
 * Likes:    961
 * Dislikes: 0
 * Total Accepted:    279.2K
 * Total Submissions: 410.5K
 * Testcase Example:  '[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]'
 *
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 *
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid
 * 的四个边缘都被 0（代表水）包围着。
 *
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 *
 * 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid =
 * [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * 输出：6
 * 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,0,0,0,0,0,0,0]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] 为 0 或 1
 *
 *
 */

// @lc code=start
// dfs - 深度优先遍历
// 时间: O(m*n)
// 空间: O(m*n)
function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let ans: number = 0;

  // 从[i, j]位置开始的"岛屿"面积
  function dfs(i, j): number {
    // 如果边界越界，返回0
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return 0;
    }
    // 如果当前位置没有土地，返回0
    if (grid[i][j] === 0) {
      return 0;
    }
    // 为了避免重复计算，当前位置计算过了，就设置为0
    grid[i][j] = 0;
    // 上面挨着的"岛屿"面积
    const top = dfs(i - 1, j);
    // 右面挨着的"岛屿"面积
    const right = dfs(i, j + 1);
    // 下面挨着的"岛屿"面积
    const bottom = dfs(i + 1, j);
    // 左面挨着的"岛屿"面积
    const left = dfs(i, j - 1);
    // 上面的"岛屿"面积+右面的"岛屿"面积+下面的"岛屿"面积+左面的"岛屿"面积+当前位置的面积
    return top + right + bottom + left + 1;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 找到从每个位置开始的最大"岛屿"面积，然后取最大值
      ans = Math.max(ans, dfs(i, j));
    }
  }
  return ans;
}
// @lc code=end
