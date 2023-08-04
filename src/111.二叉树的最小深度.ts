/*
 * @lc app=leetcode.cn id=111 lang=typescript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (51.96%)
 * Likes:    1044
 * Dislikes: 0
 * Total Accepted:    582K
 * Total Submissions: 1.1M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明：叶子节点是指没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [2,null,3,null,4,null,5,null,6]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数的范围在 [0, 10^5] 内
 * -1000
 *
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
// 广度优先遍历 - 层序遍历
// 时间: O(n)
// 空间: O(n)
function minDepth1(root: TreeNode | null): number {
  let ans = 0;
  if (!root) {
    return ans;
  }

  let queue: TreeNode[] = [root];

  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const cur = queue.shift() as TreeNode;
      if (!cur.left && !cur.right) {
        // 叶子节点，结束循环
        queue = [];
        break;
      }
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
    ans++;
  }

  return ans;
}

// 深度优先遍历
// 时间: O(n)
// 空间: O(logn)
function minDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  if (!root.left && !root.right) {
    return 1;
  }

  let leftDepth = Number.MAX_SAFE_INTEGER;
  if (root.left) {
    leftDepth = minDepth(root.left);
  }

  let rightDepth = Number.MAX_SAFE_INTEGER;
  if (root.right) {
    rightDepth = minDepth(root.right);
  }

  return Math.min(leftDepth, rightDepth) + 1;
}

// @lc code=end
