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
    // 遍历当前层，看是否存在叶子节点
    for (let i = 0; i < len; i++) {
      const cur = queue.shift() as TreeNode;
      if (!cur.left && !cur.right) {
        // 存在叶子节点，结束循环
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
    // 不存在叶子节点，深度+1，继续遍历下一层
    ans++;
  }

  return ans;
}

// 深度优先遍历
// 时间: O(n)
// 空间: O(logn)
function minDepth(root: TreeNode | null): number {
  if (!root) {
    // 只有根节点为空才会进入这个判断，停止递归，返回深度0
    return 0;
  }

  if (!root.left && !root.right) {
    // 如果当前节点不为空，但是没有左右节点，该节点就是叶子节点，停止递归，返回深度1
    return 1;
  }

  let leftDepth = Number.MAX_SAFE_INTEGER;
  if (root.left) {
    // 左子树的最小深度
    leftDepth = minDepth(root.left);
  }

  let rightDepth = Number.MAX_SAFE_INTEGER;
  if (root.right) {
    // 右子树的最小深度
    rightDepth = minDepth(root.right);
  }

  // 取左右子树较小的那个，再+1（当前节点有1的深度）
  return Math.min(leftDepth, rightDepth) + 1;
}
// @lc code=end
