/*
 * @lc app=leetcode.cn id=498 lang=typescript
 *
 * [498] 对角线遍历
 *
 * https://leetcode.cn/problems/diagonal-traverse/description/
 *
 * algorithms
 * Medium (55.76%)
 * Likes:    446
 * Dislikes: 0
 * Total Accepted:    106.6K
 * Total Submissions: 191K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,4,7,5,3,6,8,9]
 *
 *
 * 示例 2：
 *
 *
 * 输入：mat = [[1,2],[3,4]]
 * 输出：[1,2,3,4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 10^4
 * 1 <= m * n <= 10^4
 * -10^5 <= mat[i][j] <= 10^5
 *
 *
 */

// @lc code=start
// 模拟
// 时间: O(m*n)
// 空间: O(1)
function findDiagonalOrder(mat: number[][]): number[] {
  const m = mat.length;
  const n = mat[0].length;
  const ans: number[] = [];
  const directions = [
    [-1, 1],
    [1, -1],
  ];
  let step = 0;
  let i = 0,
    j = 0,
    k = 0;
  while (i < m + n - 1) {
    ans.push(mat[j][k]);
    if (
      j + directions[step][0] < 0 ||
      j + directions[step][0] >= m ||
      k + directions[step][1] < 0 ||
      k + directions[step][1] >= n
    ) {
      // 下一个坐标不正确，该拐弯了，遍历下一个对角线
      step = (step + 1) % 2;
      i++;
      if (i & 1) {
        // 下标为基数的对角线
        j = i < n ? 0 : i - n + 1;
        k = i < n ? i : n - 1;
      } else {
        // 下标为偶数的对角线
        j = i < m ? i : m - 1;
        k = i < m ? 0 : i - m + 1;
      }
    } else {
      // 该对角线还没有遍历完
      j += directions[step][0];
      k += directions[step][1];
    }
  }
  return ans;
}
// @lc code=end
