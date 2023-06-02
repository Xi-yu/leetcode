/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode.cn/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Easy (76.32%)
 * Likes:    1044
 * Dislikes: 0
 * Total Accepted:    629.1K
 * Total Submissions: 824.6K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,3]
 * 输出：[3,2,1]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目在范围 [0, 100] 内
 * -100 <= Node.val <= 100
 *
 *
 *
 *
 * 进阶：递归算法很简单，你可以通过迭代算法完成吗？
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
// 递归
// 时间: O(n)
// 空间: O(logn), 最坏情况是一个链表: O(n)
function postorderTraversal1(root: TreeNode | null): number[] {
  const ans: number[] = [];

  function helper(node: TreeNode | null) {
    if (!node) {
      return;
    }
    helper(node.left);
    helper(node.right);
    ans.push(node.val);
  }

  helper(root);

  return ans;
}

// 迭代
// 时间: O(n)
// 空间: O(n)
function postorderTraversal(root: TreeNode | null): number[] {
  const ans: number[] = [];
  const stack: TreeNode[] = [];
  let prev: TreeNode;
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (!root.right || root.right === prev) {
      ans.push(root.val);
      prev = root;
      root = null;
    } else {
      stack.push(root);
      root = root.right;
    }
  }
  return ans;
}
// @lc code=end
