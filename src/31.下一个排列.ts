/*
 * @lc app=leetcode.cn id=31 lang=typescript
 *
 * [31] 下一个排列
 *
 * https://leetcode.cn/problems/next-permutation/description/
 *
 * algorithms
 * Medium (38.25%)
 * Likes:    2312
 * Dislikes: 0
 * Total Accepted:    454.5K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,3]'
 *
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
 *
 *
 * 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
 *
 *
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列
 * 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 *
 *
 * 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
 * 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
 * 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
 *
 *
 * 给你一个整数数组 nums ，找出 nums 的下一个排列。
 *
 * 必须 原地 修改，只允许使用额外常数空间。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[1,3,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,2,1]
 * 输出：[1,2,3]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,1,5]
 * 输出：[1,5,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
// 双指针
// 将左边的【较小数】和右边的【较大数】交换，这样才能得到下一个更大的排列
// 【较小数】要尽可能的靠右，【较大数】必须是【较小数】的右边尽可能小的数
// 交换后，【较大数】右边的数还需要重新升序排列
// 时间: O(3n)
// 空间: O(1)
function nextPermutation(nums: number[]): void {
  const len = nums.length;

  if (len <= 1) {
    // 如果排列的成员只有一个，不需要修改，直接返回
    return;
  }

  // 首先倒序遍历，找到第一个nums[i]<nums[i+1]的下标i，nums[i]就是【较小数】
  let min = len - 2;
  for (; min >= 0; min--) {
    if (nums[min] < nums[min + 1]) {
      break;
    }
  }

  // [min+1,len)中的成员一定是降序的
  // 再在[min+1,len-1]中倒序遍历，找到第一个大于nums[min]的数
  // 注意：如果排列已经是最大的排列，那么上一步骤结束后，min为-1。这样的话，就没必要再查找max了，也不用交换了
  let max = len - 1;
  for (; max > min && min >= 0; max--) {
    if (nums[max] > nums[min]) {
      break;
    }
  }

  // 交换min和max
  if (min >= 0) {
    [nums[min], nums[max]] = [nums[max], nums[min]];
  }

  // 此时，[min+1, len)还是降序的
  // 需要将其变为升序
  for (let i = min + 1, j = len - 1; i < j; i++, j--) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}
// @lc code=end
