/*
 * @lc app=leetcode.cn id=556 lang=typescript
 *
 * [556] 下一个更大元素 III
 *
 * https://leetcode.cn/problems/next-greater-element-iii/description/
 *
 * algorithms
 * Medium (36.91%)
 * Likes:    335
 * Dislikes: 0
 * Total Accepted:    47.1K
 * Total Submissions: 128K
 * Testcase Example:  '12'
 *
 * 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
 *
 * 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：21
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 21
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 * 1 <= n <= 2^31 - 1
 */

// @lc code=start
// 将数字转成数组，然后找改数组的【31.下一个排列】
// 双指针：1、找到【较小数】下标min；2、找到【较大数】下标max；3、交换min和max对应的数字；4、对[min+1,len)升序排序；
// 将数组转为数字，即为答案
// 时间: O(5logn)
// 空间: O(logn)
function nextGreaterElement(n: number): number {
  const MAX = Math.pow(2, 31) - 1;

  // 将数字转为数组
  const nums: number[] = [];
  let cur = n;
  while (cur > 0) {
    nums.unshift(cur % 10);
    cur = Math.floor(cur / 10);
  }

  // 双指针，找到min和max的位置
  const len = nums.length;
  let min = len - 2;
  for (; min >= 0; min--) {
    if (nums[min] < nums[min + 1]) {
      break;
    }
  }
  let max = len - 1;
  for (; min >= 0 && max > min + 1; max--) {
    if (nums[max] > nums[min]) {
      break;
    }
  }

  // 交换min和max对应的数字
  if (min >= 0) {
    [nums[min], nums[max]] = [nums[max], nums[min]];
  } else {
    // 已经是最大排列了
    return -1;
  }

  // 将[min+1,len)从降序转为升序
  for (let i = min + 1, j = len - 1; i < j; i++, j--) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 将数组转为数字
  // cur为0，正好不用再声明变量了
  for (let i = 0; i < len; i++) {
    cur = cur * 10 + nums[i];
    if (cur > MAX) {
      // 超过32位整数了
      return -1;
    }
  }

  return cur;
}
// @lc code=end
