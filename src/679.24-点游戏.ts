/*
 * @lc app=leetcode.cn id=679 lang=typescript
 *
 * [679] 24 点游戏
 *
 * https://leetcode.cn/problems/24-game/description/
 *
 * algorithms
 * Hard (53.86%)
 * Likes:    428
 * Dislikes: 0
 * Total Accepted:    40.2K
 * Total Submissions: 74.7K
 * Testcase Example:  '[4,1,8,7]'
 *
 * 给定一个长度为4的整数数组 cards 。你有 4 张卡片，每张卡片上都包含一个范围在 [1,9] 的数字。您应该使用运算符 ['+', '-',
 * '*', '/'] 和括号 '(' 和 ')' 将这些卡片上的数字排列成数学表达式，以获得值24。
 *
 * 你须遵守以下规则:
 *
 *
 * 除法运算符 '/' 表示实数除法，而不是整数除法。
 *
 *
 * 例如， 4 /(1 - 2 / 3)= 4 /(1 / 3)= 12 。
 *
 *
 * 每个运算都在两个数字之间。特别是，不能使用 “-” 作为一元运算符。
 *
 * 例如，如果 cards =[1,1,1,1] ，则表达式 “-1 -1 -1 -1” 是 不允许 的。
 *
 *
 * 你不能把数字串在一起
 *
 * 例如，如果 cards =[1,2,1,2] ，则表达式 “12 + 12” 无效。
 *
 *
 *
 *
 * 如果可以得到这样的表达式，其计算结果为 24 ，则返回 true ，否则返回 false 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: cards = [4, 1, 8, 7]
 * 输出: true
 * 解释: (8-4) * (7-1) = 24
 *
 *
 * 示例 2:
 *
 *
 * 输入: cards = [1, 2, 1, 2]
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * cards.length == 4
 * 1 <= cards[i] <= 9
 *
 *
 */

// @lc code=start
// 回溯递归
// 时间: O(1)
// 空间: O(1)
const accuracy = Math.pow(10, -6); // 因为除法会出现精度问题，所以判断精度小于10^-6时就认为是0
// 加减乘除运算函数数组
const opfns = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => a - b,
  (a: number, b: number) => a / b,
];
function judgePoint24(cards: number[]): boolean {
  let ans = false;

  // 回溯递归函数
  function backtrack(cur: number[]) {
    if (ans) {
      // 如果已经找到等于24的情况了，直接结束函数递归
      return;
    }
    if (cur.length === 1) {
      // 如果只剩一个数字了，这次递归就结束了
      if (Math.abs(cur[0] - 24) < accuracy) {
        // 如果该数字与24的差的绝对值小于10^-6，就认为两者相等
        ans = true;
      }
      return;
    }
    // 遍历从当前数组中选出两个数字的所有情况
    for (let i = 0; i < cur.length - 1; i++) {
      for (let j = i + 1; j < cur.length; j++) {
        // 删除选出来的两个数字，这是下一次递归的数组
        const temp = removeItemFromArr(cur, i, j);
        for (let k = 0; k < 4; k++) {
          // 将计算结果放入数组
          temp.push(opfns[k](cur[i], cur[j]));
          backtrack(temp);
          // 递归结束，回溯，恢复数组，开始下一次递归
          temp.pop();
          // 遍历四种运算情况，减法和除法两个数字交换后结果不一样，所以减法和除法需要交换两个数字后再递归一次
          if (k === 2 || k === 3) {
            // 将计算结果放入数组
            temp.push(opfns[k](cur[j], cur[i]));
            backtrack(temp);
            // 递归结束，回溯，恢复数组，开始下一次递归
            temp.pop();
          }
        }
      }
    }
  }

  backtrack(cards);

  return ans;
}

function removeItemFromArr(arr: number[], i: number, j: number): number[] {
  const temp: number[] = [];
  for (let k = 0; k < arr.length; k++) {
    if (k !== i && k !== j) {
      temp.push(arr[k]);
    }
  }
  return temp;
}
// @lc code=end
