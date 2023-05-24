/*
 * @lc app=leetcode.cn id=79 lang=typescript
 *
 * [79] 单词搜索
 *
 * https://leetcode.cn/problems/word-search/description/
 *
 * algorithms
 * Medium (46.31%)
 * Likes:    1598
 * Dislikes: 0
 * Total Accepted:    428K
 * Total Submissions: 924.6K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false
 * 。
 *
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCCED"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "SEE"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCB"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == board.length
 * n = board[i].length
 * 1
 * 1
 * board 和 word 仅由大小写英文字母组成
 *
 *
 *
 *
 * 进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
 *
 */

// @lc code=start
// 回溯递归
// 时间: O(mn)
// 空间: O(mn)
function exist(board: string[][], word: string): boolean {
  const length = word.length;
  const m = board.length;
  const n = board[0].length;
  let ans = false;

  function backtrack(i, j, k) {
    if (ans) {
      // 已经找到了一条匹配的路径，其余路径无需查找了
      return;
    }
    if (k === length - 1) {
      // 顺利走到了word的末尾，表示可以找到一条路径与word匹配
      // 更新答案，退出函数
      ans = true;
      return;
    }
    let temp;
    // 尝试向上走
    if (i - 1 >= 0 && board[i - 1][j] === word[k + 1]) {
      temp = board[i - 1][j];
      board[i - 1][j] = ""; // 走过的位置设置为''，避免重复走
      backtrack(i - 1, j, k + 1);
      board[i - 1][j] = temp; // 回溯回来又复原
    }
    // 尝试向左走
    if (j - 1 >= 0 && board[i][j - 1] === word[k + 1]) {
      temp = board[i][j - 1];
      board[i][j - 1] = ""; // 走过的位置设置为''，避免重复走
      backtrack(i, j - 1, k + 1);
      board[i][j - 1] = temp; // 回溯回来又复原
    }
    // 尝试向下走
    if (i + 1 < m && board[i + 1][j] === word[k + 1]) {
      temp = board[i + 1][j];
      board[i + 1][j] = ""; // 走过的位置设置为''，避免重复走
      backtrack(i + 1, j, k + 1);
      board[i + 1][j] = temp; // 回溯回来又复原
    }
    // 尝试向右走
    if (j + 1 < n && board[i][j + 1] === word[k + 1]) {
      temp = board[i][j + 1];
      board[i][j + 1] = ""; // 走过的位置设置为''，避免重复走
      backtrack(i, j + 1, k + 1);
      board[i][j + 1] = temp; // 回溯回来又复原
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        const temp = board[i][j];
        board[i][j] = ""; // 走过的位置设置为''
        backtrack(i, j, 0);
        board[i][j] = temp; // 回溯回来又复原
      }
    }
  }

  return ans;
}
// @lc code=end
