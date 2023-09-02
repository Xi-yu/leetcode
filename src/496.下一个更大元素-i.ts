/*
 * @lc app=leetcode.cn id=496 lang=typescript
 *
 * [496] 下一个更大元素 I
 *
 * https://leetcode.cn/problems/next-greater-element-i/description/
 *
 * algorithms
 * Easy (71.78%)
 * Likes:    1072
 * Dislikes: 0
 * Total Accepted:    277.4K
 * Total Submissions: 386.4K
 * Testcase Example:  '[4,1,2]\n[1,3,4,2]'
 *
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
 *
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
 *
 * 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定
 * nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
 *
 * 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 * - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
 * - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [2,4], nums2 = [1,2,3,4].
 * 输出：[3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
 * - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length <= nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 10^4
 * nums1和nums2中所有整数 互不相同
 * nums1 中的所有整数同样出现在 nums2 中
 *
 *
 *
 *
 * 进阶：你可以设计一个时间复杂度为 O(nums1.length + nums2.length) 的解决方案吗？
 *
 */

// @lc code=start
// 暴力
// 时间: O(mn)
// 空间: O(1)
function nextGreaterElement1(nums1: number[], nums2: number[]): number[] {
  const m = nums1.length;
  const n = nums2.length;
  // 默认-1
  const ans: number[] = new Array(m).fill(-1);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (nums1[i] === nums2[j]) {
        // 从nums2的位置j+1开始，找到第一个大于nums[i]的数
        let k = j + 1;
        while (k < n) {
          if (nums2[k] > nums1[i]) {
            // 如果找到了，就更新答案
            // 并且退出j循环
            ans[i] = nums2[k];
            j = n;
            break;
          }
          k++;
        }
      }
    }
  }

  return ans;
}

// 哈希+单调栈
// 时间: O(m+n)
// 空间: O(2n)
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const m = nums1.length;
  const n = nums2.length;
  const ans: number[] = new Array(m).fill(-1);
  // 保存nums2每个数字的下一个更大的数
  const hash = new Map<number, number>();
  // 单调递减栈
  const stack: number[] = [];

  // 先找到num2中所有数字的下一个更大的数，并保存在哈希中
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums2[i] > stack[stack.length - 1]) {
      const cur = stack.pop() as number;
      hash.set(cur, nums2[i]);
    }
    stack.push(nums2[i]);
  }

  // 再遍历num1，去哈希中获取
  // 如果没有在哈希中，就表示没有下一个更大的数，则为-1
  for (let i = 0; i < m; i++) {
    const cur = nums1[i];
    if (hash.has(cur)) {
      ans[i] = hash.get(cur) as number;
    }
  }

  return ans;
}
// @lc code=end
