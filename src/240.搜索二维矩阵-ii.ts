/*
 * @lc app=leetcode.cn id=240 lang=typescript
 *
 * [240] 搜索二维矩阵 II
 *
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 *
 * algorithms
 * Medium (52.64%)
 * Likes:    1257
 * Dislikes: 0
 * Total Accepted:    361.3K
 * Total Submissions: 686.3K
 * Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
  '5'
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * 
 * 
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 5
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 20
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
 * 1 <= n, m <= 300
 * -10^9 <= matrix[i][j] <= 10^9
 * 每行的所有元素从左到右升序排列
 * 每列的所有元素从上到下升序排列
 * -10^9 <= target <= 10^9
 * 
 * 
 */

// @lc code=start
// 对每一行进行二分查找
// 时间: O(mlogn)
// 空间: O(1)
function searchMatrix1(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) {
    // 如果比左上角小或者比右下角大，直接返回false
    return false;
  }
  for (let i = 0; i < m - 1; i++) {
    // 对每一行数据进行二分查找
    let left = 0,
      right = n - 1;
    while (left <= right) {
      // 计算中点，进行二分
      const mid = left + ((right - left) >> 1);
      if (matrix[i][mid] === target) {
        return true; // 找到了
      }
      if (matrix[i][mid] > target) {
        // 比目标大，更新右断点
        right = mid - 1;
      } else {
        // 比目标小，更新左断点
        left = mid + 1;
      }
    }
  }
  // 所有数据都遍历完了，没找到
  return false;
}

// Z字形查找
// 时间: O(m+n)
// 空间: O(1)
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) {
    // 如果比左上角小或者比右下角大，直接返回false
    return false;
  }
  let x = 0,
    y = n - 1;
  // 从右上角开始比较
  while (x < m && y >= 0) {
    if (matrix[x][y] === target) {
      return true; // 找到了
    }
    if (matrix[x][y] > target) {
      // 如果右上角比target大
      // 则y列左移
      y--;
    } else {
      // 否则，x行下移
      x++;
    }
  }
  // 所有数据都遍历完了，没找到
  return false;
}
// @lc code=end
