/*
 * @lc app=leetcode.cn id=74 lang=typescript
 *
 * [74] 搜索二维矩阵
 *
 * https://leetcode.cn/problems/search-a-2d-matrix/description/
 *
 * algorithms
 * Medium (48.58%)
 * Likes:    805
 * Dislikes: 0
 * Total Accepted:    312.7K
 * Total Submissions: 642.6K
 * Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'
 *
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 *
 *
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * -10^4
 *
 *
 */

// @lc code=start
// 两次二分
// 时间: O(logmn)
// 空间: O(1)
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) {
    return false;
  }
  let ans = false;
  let rowLeft = 0,
    rowRight = m - 1;
  while (rowLeft <= rowRight) {
    const rowMid = rowLeft + ((rowRight - rowLeft) >> 1);
    if (target < matrix[rowMid][0]) {
      // target比这一行的第一个数小
      // 继续查找[rowLeft, rowMid - 1]
      rowRight = rowMid - 1;
    } else if (target > matrix[rowMid][n - 1]) {
      // target比这一行的最后一个数大
      // 继续查找[rowMid + 1, rowRight]
      rowLeft = rowMid + 1;
    } else {
      // 否则，target就在这一行
      // 继续二分查找这一行
      let colLeft = 0,
        colRight = n - 1;
      while (colLeft <= colRight) {
        const colMid = colLeft + ((colRight - colLeft) >> 1);
        if (target < matrix[rowMid][colMid]) {
          // target比这个数小
          // 继续查找[colLeft, colMid - 1]
          colRight = colMid - 1;
        } else if (target > matrix[rowMid][colMid]) {
          // target比这个数大
          // 继续查找[colMid + 1, colRight]
          colLeft = colMid + 1;
        } else {
          ans = true;
          break;
        }
      }
      break;
    }
  }
  return ans;
}
// @lc code=end
