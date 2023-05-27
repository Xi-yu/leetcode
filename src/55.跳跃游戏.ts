/*
 * @lc app=leetcode.cn id=55 lang=typescript
 *
 * [55] 跳跃游戏
 *
 * https://leetcode.cn/problems/jump-game/description/
 *
 * algorithms
 * Medium (43.63%)
 * Likes:    2330
 * Dislikes: 0
 * Total Accepted:    712.7K
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 *
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 *
 * 判断你是否能够到达最后一个下标。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
// 贪心
// 时间: O(n)
// 空间: O(1)
function canJump(nums: number[]): boolean {
  const length = nums.length;
  let max = nums[0]; // 最远可以到达的位置
  for (let i = 0; i < length; i++) {
    if (i <= max) {
      // 如果当前位置在最远可到达的位置范围内
      // 就尝试更新最远可到达的位置
      max = Math.max(max, i + nums[i]);
      if (max >= length - 1) {
        // 如果最远可到达的位置，已经超过nums的最后一个位置了
        // 返回true
        return true;
      }
    } else {
      // 否则，当前位置到达不了
      // 返回false
      return false;
    }
  }
  // 顺利遍历结束
  // 返回true
  return true;
}
// @lc code=end
