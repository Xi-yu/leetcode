/*
 * @lc app=leetcode.cn id=230 lang=typescript
 *
 * [230] 二叉搜索树中第K小的元素
 *
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/
 *
 * algorithms
 * Medium (75.95%)
 * Likes:    744
 * Dislikes: 0
 * Total Accepted:    269.5K
 * Total Submissions: 354.5K
 * Testcase Example:  '[3,1,4,null,2]\n1'
 *
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,1,4,null,2], k = 1
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,3,6,2,4,null,null,1], k = 3
 * 输出：3
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数为 n 。
 * 1
 * 0
 *
 *
 *
 *
 * 进阶：如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// 左根右遍历二叉树，结果就是从小到大排列的数组
// 时间: O(n)
// 空间: O(n)
function kthSmallest(root: TreeNode | null, k: number): number {
  const arr: number[] = [];
  const stack: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    arr.push(root.val);
    root = root.right;
  }

  return arr[k - 1];
}
// @lc code=end
