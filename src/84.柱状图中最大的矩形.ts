/*
 * @lc app=leetcode.cn id=84 lang=typescript
 *
 * [84] 柱状图中最大的矩形
 *
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 *
 * algorithms
 * Hard (44.90%)
 * Likes:    2593
 * Dislikes: 0
 * Total Accepted:    373.6K
 * Total Submissions: 825.8K
 * Testcase Example:  '[2,1,5,6,2,3]'
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 *
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：heights = [2,1,5,6,2,3]
 * 输出：10
 * 解释：最大的矩形为图中红色区域，面积为 10
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入： heights = [2,4]
 * 输出： 4
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
// 暴力枚举【宽】
// 时间: O(n^2)
// 空间: O(1)
function largestRectangleArea1(heights: number[]): number {
  const n = heights.length;
  let ans = heights[0];

  for (let i = 0; i < n; i++) {
    let height = heights[i];
    for (let j = i; j < n; j++) {
      const width = j - i + 1;
      height = Math.min(height, heights[j]);
      ans = Math.max(ans, width * height);
    }
  }

  return ans;
}

// 暴力枚举【高】
// 时间: O(n^2)
// 空间: O(1)
function largestRectangleArea2(heights: number[]): number {
  const n = heights.length;
  let ans = heights[0];

  for (let i = 0; i < n; i++) {
    const height = heights[i];
    let left = i,
      right = i;
    while (left - 1 >= 0 && heights[left - 1] >= height) {
      left--;
    }
    while (right + 1 < n && heights[right + 1] >= height) {
      right++;
    }
    ans = Math.max(ans, height * (right - left + 1));
  }

  return ans;
}

// 单调栈
// 时间: O(3n)
// 空间: O(3n)
function largestRectangleArea3(heights: number[]): number {
  const n = heights.length;
  // left[i]: 下标i左边最近的小于其高度的下标
  const left: number[] = new Array(n).fill(-1);
  // right[i]: 下标i右边最近的小于其高度的下标
  const right: number[] = new Array(n).fill(n);
  // 单调非递减栈: stack[i]<=stack[j] (i<j)
  let stack: number[] = [];

  // 先从左到右遍历,找到每个下标左边最近的小于其高度的下标
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      stack.pop();
    }
    if (stack.length === 0) {
      left[i] = -1; // 左边不存在小于其高度的下标
    } else {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  // 再从右到左遍历,找到每个下标右边最近的小于其高度的下标
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    if (stack.length === 0) {
      right[i] = n; // 右边不存在小于其高度的下标
    } else {
      right[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  // 最后按[高]遍历,找出最大面积
  let ans = heights[0];
  for (let i = 0; i < n; i++) {
    const height = heights[i];
    ans = Math.max(ans, height * (right[i] - left[i] - 1));
  }

  return ans;
}

// 单调栈+空间优化
// 时间: O(2n)
// 空间: O(3n)
function largestRectangleArea(heights: number[]): number {
  const n = heights.length;
  // left[i]: 下标i左边最近的小于其高度的下标
  const left: number[] = new Array(n).fill(-1);
  // right[i]: 下标i右边最近的小于其高度的下标
  const right: number[] = new Array(n).fill(n);
  // 单调非递减栈: stack[i]<=stack[j] (i<j)
  const stack: number[] = [];

  // 从左到右一次遍历得到
  // 每个下标的左边最近小于其高度的下标
  // 和右边最近小于其高度的下标
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      // 说明下标j的右边最近小于其高度的下标就是i
      const j = stack.pop() as number;
      right[j] = i;
    }
    if (stack.length === 0) {
      left[i] = -1;
    } else {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  // stack中剩余的下标，都是右边不存在小于其高度下标的下标
  // 但是因为初始化right时，都fill为n
  // 所以这一步可以省略
  // while (stack.length) {
  //   const j = stack.pop() as number;
  //   right[j] = n;
  // }

  // 最后按[高]遍历,找出最大面积
  let ans = heights[0];
  for (let i = 0; i < n; i++) {
    const height = heights[i];
    ans = Math.max(ans, height * (right[i] - left[i] - 1));
  }

  return ans;
}
// @lc code=end
// [2,1,5,6,2,3]
// i=5
// left=[-1,-1,1,2,1,4]
// right=[1,6,4,4,6,6]
// stack=[1,4,5]
// ans=10
