/*
 * @lc app=leetcode.cn id=349 lang=typescript
 *
 * [349] 两个数组的交集
 *
 * https://leetcode.cn/problems/intersection-of-two-arrays/description/
 *
 * algorithms
 * Easy (74.25%)
 * Likes:    789
 * Dislikes: 0
 * Total Accepted:    456.1K
 * Total Submissions: 614.1K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 * 解释：[4,9] 也是可通过的
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 1000
 *
 *
 */

// @lc code=start
// 哈希
// 时间: O(m+n)
// 空间: O(m)
function intersection(nums1: number[], nums2: number[]): number[] {
  const hash = new Set();
  const ans: number[] = [];
  for (const n of nums1) {
    hash.add(n);
  }
  for (const n of nums2) {
    if (hash.has(n)) {
      hash.delete(n);
      ans.push(n);
    }
  }
  return ans;
}
// @lc code=end
