/*
 * @lc app=leetcode.cn id=611 lang=typescript
 *
 * [611] 有效三角形的个数
 *
 * https://leetcode.cn/problems/valid-triangle-number/description/
 *
 * algorithms
 * Medium (53.74%)
 * Likes:    509
 * Dislikes: 0
 * Total Accepted:    91K
 * Total Submissions: 169.4K
 * Testcase Example:  '[2,2,3,4]'
 *
 * 给定一个包含非负整数的数组 nums ，返回其中可以组成三角形三条边的三元组个数。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [2,2,3,4]
 * 输出: 3
 * 解释:有效的组合是:
 * 2,3,4 (使用第一个 2)
 * 2,3,4 (使用第二个 2)
 * 2,2,3
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [4,2,3,4]
 * 输出: 4
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] <= 1000
 *
 *
 */

// @lc code=start
// 排序+暴力遍历
// 时间: O(nlogn+n^3)
// 空间: O(logn)
function triangleNumber(nums: number[]): number {
  // 先排序
  nums.sort((a, b) => a - b);

  let ans = 0;
  const len = nums.length;

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      const sum = nums[i] + nums[j];
      for (let k = j + 1; k < len; k++) {
        if (sum > nums[k]) {
          // 只要满足两个小的边长之和大于第三边，就是有效的三角形
          ans++;
        } else {
          // 否则，不是有效的三角形，并且后面的也不用再判断了，因为排过序了
          break;
        }
      }
    }
  }

  return ans;
}
// @lc code=end
