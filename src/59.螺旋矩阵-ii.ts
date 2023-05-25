/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 *
 * https://leetcode.cn/problems/spiral-matrix-ii/description/
 *
 * algorithms
 * Medium (73.32%)
 * Likes:    1056
 * Dislikes: 0
 * Total Accepted:    318.5K
 * Total Submissions: 436.1K
 * Testcase Example:  '3'
 *
 * 给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：[[1,2,3],[8,9,4],[7,6,5]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：[[1]]
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
// 模拟
// 时间: O(n^2)
// 空间: O(1)
function generateMatrix(n: number): number[][] {
  const ans: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const direction = [
    [0, 1], // 向右移动一步
    [1, 0], // 向下移动一步
    [0, -1], // 向左移动一步
    [-1, 0], // 向上移动一步
  ];
  let step = 0;
  let i = 0,
    j = 0;
  let cur = 1;
  while (cur <= n * n) {
    ans[i][j] = cur;
    cur++;
    let nextI = i + direction[step][0]; // 下一步的坐标
    let nextJ = j + direction[step][1]; // 下一步的坐标
    if (
      nextI < 0 ||
      nextI >= n ||
      nextJ < 0 ||
      nextJ >= n ||
      ans[nextI][nextJ] !== 0
    ) {
      // 如果下一步坐标不在矩阵范围内
      // 或者，下一步坐标值已经被设置过
      // 改变移动方向
      step = (step + 1) % 4;
      nextI = i + direction[step][0];
      nextJ = j + direction[step][1];
    }
    i = nextI;
    j = nextJ;
  }

  return ans;
}
// @lc code=end
