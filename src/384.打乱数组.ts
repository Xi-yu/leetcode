/*
 * @lc app=leetcode.cn id=384 lang=typescript
 *
 * [384] 打乱数组
 *
 * https://leetcode.cn/problems/shuffle-an-array/description/
 *
 * algorithms
 * Medium (61.54%)
 * Likes:    340
 * Dislikes: 0
 * Total Accepted:    124.4K
 * Total Submissions: 201.9K
 * Testcase Example:  '["Solution","shuffle","reset","shuffle"]\n[[[1,2,3]],[],[],[]]'
 *
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。
 *
 * 实现 Solution class:
 *
 *
 * Solution(int[] nums) 使用整数数组 nums 初始化对象
 * int[] reset() 重设数组到它的初始状态并返回
 * int[] shuffle() 返回数组随机打乱后的结果
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入
 * ["Solution", "shuffle", "reset", "shuffle"]
 * [[[1, 2, 3]], [], [], []]
 * 输出
 * [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
 *
 * 解释
 * Solution solution = new Solution([1, 2, 3]);
 * solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回
 * [3, 1, 2]
 * solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
 * solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 50
 * -10^6 <= nums[i] <= 10^6
 * nums 中的所有元素都是 唯一的
 * 最多可以调用 10^4 次 reset 和 shuffle
 *
 *
 */

// @lc code=start
// 洗牌算法
class Solution {
  nums: number[];
  initNums: number[];
  constructor(nums: number[]) {
    // 时间: O(n)
    // 空间: O(n)
    this.nums = nums;
    this.initNums = [...nums];
  }

  reset(): number[] {
    // 时间: O(n)
    // 空间: O(1)
    this.nums = [...this.initNums];
    return this.nums;
  }

  shuffle(): number[] {
    // 时间: O(n)
    // 空间: O(1)
    // 洗牌算法
    // 倒序遍历数组，将每个数字和前面(包括当前位置)任意随机位置交换
    for (let i = this.nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (i !== j) {
        [this.nums[i], this.nums[j]] = [this.nums[j], this.nums[i]];
      }
    }
    return this.nums;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end
