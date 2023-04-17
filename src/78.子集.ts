/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] 子集
 *
 * https://leetcode.cn/problems/subsets/description/
 *
 * algorithms
 * Medium (81.07%)
 * Likes:    2008
 * Dislikes: 0
 * Total Accepted:    613.1K
 * Total Submissions: 756.3K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 * nums 中的所有元素 互不相同
 *
 *
 */

// @lc code=start
// 递归回溯所有的情况
// 所有的情况：每一个数字都有选和不选两种状态，所以一共2^n种结果，n=nums.length
// 时间: O(n*2^n)
// 空间: O(n), cur空间O(n),递归调用栈空间O(n)
function subsets1(nums: number[]): number[][] {
  const ans: number[][] = [];
  let cur: number[] = [];
  function backtrack(index: number): void {
    if (index === nums.length) {
      ans.push(cur);
      return;
    }
    cur.push(nums[index]); // 选当前index处的数字
    backtrack(index + 1);
    cur = cur.slice(0, cur.length - 1); // 不选当前index处的数字
    backtrack(index + 1);
  }
  backtrack(0);
  return ans;
}

// 巧妙的利用位运算，可以不用递归调用的栈空间
// 000 => (不选)(不选)(不选)
// 001 => (不选)(不选)(选)
// 010 => (不选)(选)(不选)
// 时间: O(n*2^n)
// 空间: O(n), 没有递归调用栈空间
function subsets(nums: number[]): number[][] {
  const ans: number[][] = [];
  const len = nums.length;
  let cur: number[] = [];
  for (let i = 0; i < 1 << len; i++) {
    for (let j = 0; j < len; j++) {
      if ((1 << j) & i) {
        // i从右往左数，第j个位置是1，就选，是0，就不选
        cur.push(nums[j]);
      }
    }
    ans.push(cur);
    cur = [];
  }
  return ans;
}
// @lc code=end
