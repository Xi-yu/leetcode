/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 *
 * https://leetcode.cn/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (59.93%)
 * Likes:    1351
 * Dislikes: 0
 * Total Accepted:    429.8K
 * Total Submissions: 718.6K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用 一次 。
 *
 * 注意：解集不能包含重复的组合。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 *
 * 示例 2:
 *
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 *
 *
 */

// @lc code=start
// 先排序，后回溯递归
// 时间: O(n2^n)
// 空间: O(n)
function combinationSum2(candidates: number[], target: number): number[][] {
  // 不能包含重复的组合，需要先排序
  candidates.sort((a, b) => a - b);
  const length = candidates.length;
  const ans: number[][] = [];

  function backtrack(i: number, left: number, cur: number[]) {
    if (i >= length || left <= 0) {
      // 递归终止条件：下标超出范围 或者 target已经满足或超过了
      if (left === 0) {
        // 如果target正好满足，这就是一个组合答案
        ans.push(cur);
      }
      return;
    }
    for (let j = i + 1; j < length; j++) {
      // 继续递归剩余的数字
      if (candidates[j] > left) {
        // 如果当前数字已经大于剩余数字了，因为排序过了，所以剩下的数字也不需要递归了
        break;
      }
      backtrack(j, left - candidates[j], [...cur, candidates[j]]);
      while (j + 1 < length && candidates[j + 1] === candidates[j]) {
        // 相邻重复的数字，不需要在回溯递归了
        j++;
      }
    }
  }

  for (let i = 0; i < length; i++) {
    // 如果当前数字已经大于剩余数字了，因为排序过了，所以剩下的数字也不需要递归了
    if (candidates[i] > target) {
      break;
    }
    backtrack(i, target - candidates[i], [candidates[i]]);
    while (i + 1 < length && candidates[i + 1] === candidates[i]) {
      // 相邻重复的数字，不需要在回溯递归了
      i++;
    }
  }

  return ans;
}
// @lc code=end
