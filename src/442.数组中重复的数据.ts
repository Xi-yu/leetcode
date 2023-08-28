/*
 * @lc app=leetcode.cn id=442 lang=typescript
 *
 * [442] 数组中重复的数据
 *
 * https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/
 *
 * algorithms
 * Medium (75.12%)
 * Likes:    736
 * Dislikes: 0
 * Total Accepted:    112.4K
 * Total Submissions: 149.7K
 * Testcase Example:  '[4,3,2,7,8,2,3,1]'
 *
 * 给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现
 * 两次 的整数，并以数组形式返回。
 *
 * 你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,3,2,7,8,2,3,1]
 * 输出：[2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1,2]
 * 输出：[1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 10^5
 * 1 <= nums[i] <= n
 * nums 中的每个元素出现 一次 或 两次
 *
 *
 */

// @lc code=start
// 哈希
// 时间: O(n)
// 空间: O(n)
function findDuplicates1(nums: number[]): number[] {
  const ans: number[] = [];
  const hash = new Set();

  for (const n of nums) {
    if (hash.has(n)) {
      ans.push(n);
    }
    hash.add(n);
  }

  return ans;
}

// 1到n个数字，如果有的数字出现了两次，那么必然有的数字没有出现过
// 把所有数字放入对应的位置，重复出现的数字放到任意没有出现过的数字的位置
// 时间: O(2n)
// 空间: O(1)
function findDuplicates2(nums: number[]): number[] {
  const ans: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    let j = nums[i];
    let temp = j;
    // 如果当前数字j不应该在下标i，并且应该放入的位置(j-1)的数字不等于当前数字j
    // 就把当前数字j放到j-1的位置
    // 继续判断j-1位置原来的数字应该放入的位置
    while (j - 1 !== i && nums[j - 1] !== j) {
      temp = nums[j - 1];
      nums[j - 1] = j;
      j = temp;
    }
    nums[i] = temp;
  }

  for (let i = 0; i < nums.length; i++) {
    // 如果下标i的数字不是i+1，证明nums[i]就是重复的数字之一，i+1就是没有出现过的数字之一
    if (nums[i] !== i + 1) {
      ans.push(nums[i]);
    }
  }

  return ans;
}

// 用正负号标记
// 时间: O(n)
// 空间: O(1)
function findDuplicates(nums: number[]): number[] {
  const ans: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const cur = Math.abs(nums[i]);
    // 如果是负数，表示cur是出现了两次的数字
    if (nums[cur - 1] < 0) {
      ans.push(cur);
    }
    nums[cur - 1] = -nums[cur - 1];
  }

  return ans;
}
// @lc code=end
