/*
 * @lc app=leetcode.cn id=287 lang=typescript
 *
 * [287] 寻找重复数
 *
 * https://leetcode.cn/problems/find-the-duplicate-number/description/
 *
 * algorithms
 * Medium (64.29%)
 * Likes:    2174
 * Dislikes: 0
 * Total Accepted:    321.2K
 * Total Submissions: 500.1K
 * Testcase Example:  '[1,3,4,2,2]'
 *
 * 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 *
 * 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
 *
 * 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,3,4,2,2]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,1,3,4,2]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^5
 * nums.length == n + 1
 * 1 <= nums[i] <= n
 * nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如何证明 nums 中至少存在一个重复的数字?
 * 你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？
 *
 *
 */

// @lc code=start
// hash
// 时间: O(n)
// 空间: O(n)
function findDuplicate1(nums: number[]): number {
  const hash = new Set();
  for (const n of nums) {
    if (hash.has(n)) {
      return n;
    }
    hash.add(n);
  }
  return -1;
}

// 环形链表模拟, 快慢指针找到入环处
// 时间: O(2n)
// 空间: O(1)
function findDuplicate(nums: number[]): number {
  // 假设数组是一个链表，nums[i].next = nums[nums[i]] (值相同的话，视为同一个节点)
  // 这样的话，如果有重复的数字，链表会存在环，并且重复数字一定是环形链表的入环处
  // 如数组: [1,3,4,2,2]
  // 假设转为链表: 1(下标0) -> 3(下标1) -> 2(下标3) -> 4(下标2) -> 2(下标4,与下标3的值相同,视为同一个节点)

  // 1、利用快慢指针一定会在环形链表的环中相遇, 找到相遇位置
  let slow = 0,
    fast = 0;
  while (slow === 0 || nums[slow] !== nums[fast]) {
    slow = nums[slow]; // 慢指针走一步 2
    fast = nums[nums[fast]]; // 快指针走两步
  }
  // 2、再定义一个指针从0出发, 和slow指针一起一步一步的走, 最后会在入环处相遇
  let ptr = 0;
  while (nums[ptr] !== nums[slow]) {
    ptr = nums[ptr];
    slow = nums[slow];
  }
  return nums[ptr];
}
// @lc code=end
