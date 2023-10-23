/*
 * @lc app=leetcode.cn id=37 lang=typescript
 *
 * [37] 解数独
 *
 * https://leetcode.cn/problems/sudoku-solver/description/
 *
 * algorithms
 * Hard (67.57%)
 * Likes:    1714
 * Dislikes: 0
 * Total Accepted:    219.7K
 * Total Submissions: 325.1K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 编写一个程序，通过填充空格来解决数独问题。
 *
 * 数独的解法需 遵循如下规则：
 *
 *
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 *
 *
 * 数独部分空格内已填入了数字，空白格用 '.' 表示。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board =
 * [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
 *
 * 输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
 * 解释：输入的数独如上图所示，唯一有效的解决方案如下所示：
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * board.length == 9
 * board[i].length == 9
 * board[i][j] 是一位数字或者 '.'
 * 题目数据 保证 输入数独仅有一个解
 *
 *
 *
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
// 回溯递归
// 时间: O(9^81)
// 空间: O(9^9)
function solveSudoku1(board: string[][]): void {
  const rows: Set<string>[] = new Array(9).fill(0).map(() => new Set()); // 保存每一行已填写的数字
  const cols: Set<string>[] = new Array(9).fill(0).map(() => new Set()); // 保存每一列已填写的数字
  const blocks: Set<string>[][] = new Array(3)
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Set())); // 保存每一个3*3宫已填写的数字
  const spaces: number[][] = new Array(); // 保存所有空格位置
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        spaces.push([i, j]);
        continue;
      }
      rows[i].add(board[i][j]);
      cols[j].add(board[i][j]);
      blocks[Math.floor(i / 3)][Math.floor(j / 3)].add(board[i][j]);
    }
  }

  const backtrack = (index: number): boolean => {
    if (index === spaces.length) {
      // 所有空格都已填完
      return true;
    }
    const [i, j] = spaces[index];
    for (let digit = 1; digit <= 9; digit++) {
      const digitStr = String(digit);
      if (
        !rows[i].has(digitStr) &&
        !cols[j].has(digitStr) &&
        !blocks[Math.floor(i / 3)][Math.floor(j / 3)].has(digitStr)
      ) {
        // 该位置所在的行、列、3*3宫 都没有出现过该数字，则该数字可以填入
        rows[i].add(digitStr);
        cols[j].add(digitStr);
        blocks[Math.floor(i / 3)][Math.floor(j / 3)].add(digitStr);
        board[i][j] = digitStr;
        if (backtrack(index + 1)) {
          return true;
        }
        // 回溯 - 将所有状态复原
        rows[i].delete(digitStr);
        cols[j].delete(digitStr);
        blocks[Math.floor(i / 3)][Math.floor(j / 3)].delete(digitStr);
      }
    }
    return false;
  };

  backtrack(0);
}

// 回溯递归 - 位运算空间优化
// 0b1: 表示1已经出现过
// 0b10: 表示2已经出现过
// 0b11: 表示1和2已经出现过
// ...
// 0b111111111: 表示1到9都已经出现过
// 时间: O(9^81)
// 空间: O(9)
function solveSudoku(board: string[][]): void {
  const rows: number[] = new Array(9).fill(0); // 保存每一行已填写的数字
  const cols: number[] = new Array(9).fill(0); // 保存每一列已填写的数字
  const blocks: number[][] = new Array(3)
    .fill(0)
    .map(() => new Array(3).fill(0)); // 保存每一个3*3宫已填写的数字
  const spaces: number[][] = new Array(); // 保存所有空格位置
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        spaces.push([i, j]);
        continue;
      }
      const digit = Number(board[i][j]) - 1;
      rows[i] |= 1 << digit;
      cols[j] |= 1 << digit;
      blocks[Math.floor(i / 3)][Math.floor(j / 3)] |= 1 << digit;
    }
  }

  const backtrack = (index: number): boolean => {
    if (index === spaces.length) {
      return true;
    }
    const [i, j] = spaces[index];
    for (let digit = 1; digit <= 9; digit++) {
      const digitStr = String(digit);
      const digitBinary = 1 << (digit - 1);
      if (
        ~(rows[i] | ~digitBinary) !== 0 &&
        ~(cols[j] | ~digitBinary) !== 0 &&
        ~(blocks[Math.floor(i / 3)][Math.floor(j / 3)] | ~digitBinary) !== 0
      ) {
        rows[i] |= digitBinary;
        cols[j] |= digitBinary;
        blocks[Math.floor(i / 3)][Math.floor(j / 3)] |= digitBinary;
        board[i][j] = digitStr;
        if (backtrack(index + 1)) {
          return true;
        }
        rows[i] &= ~digitBinary;
        cols[j] &= ~digitBinary;
        blocks[Math.floor(i / 3)][Math.floor(j / 3)] &= ~digitBinary;
      }
    }
    return false;
  };

  backtrack(0);
}
// @lc code=end
