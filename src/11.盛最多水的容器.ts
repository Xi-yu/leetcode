/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode.cn/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (60.35%)
 * Likes:    4320
 * Dislikes: 0
 * Total Accepted:    986K
 * Total Submissions: 1.6M
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 *
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 返回容器可以储存的最大水量。
 *
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 * 示例 2：
 *
 *
 * 输入：height = [1,1]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 *
 *
 */

// @lc code=start
// 贪心 - 双指针
// 时间: O(n)
// 空间: O(1)
function maxArea(height: number[]): number {
  const length = height.length;
  let left = 0,
    right = length - 1;
  let ans: number = 0;
  while (left < right) {
    // 更新答案
    ans = Math.max(ans, (right - left) * Math.min(height[left], height[right]));
    // 移动高度大的一边的指针，面积一定会变小，所以不能这样做
    // 只有移动高度小的一边的指针，才可能会有更大的面积
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return ans;
}
// @lc code=end
