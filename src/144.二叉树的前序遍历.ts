/*
 * @lc app=leetcode.cn id=144 lang=typescript
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Easy (71.29%)
 * Likes:    1053
 * Dislikes: 0
 * Total Accepted:    840.5K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,2,3]
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
 * 示例 4：
 *
 *
 * 输入：root = [1,2]
 * 输出：[1,2]
 *
 *
 * 示例 5：
 *
 *
 * 输入：root = [1,null,2]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 100] 内
 * -100
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
// 空间: O(n)
function preorderTraversal1(root: TreeNode | null): number[] {
  const ans: number[] = [];
  function help(node: TreeNode | null): void {
    if (!node) {
      return;
    }
    ans.push(node.val); // 根
    help(node.left); // 左
    help(node.right); // 右
  }
  help(root);
  return ans;
}

// 迭代
// 时间: O(n)
// 空间: O(n)
function preorderTraversal(root: TreeNode | null): number[] {
  const ans: number[] = [];
  const stack: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      ans.push(root.val); // 根
      stack.push(root);
      root = root.left; // 左
    }
    root = stack.pop().right; //右
  }
  return ans;
}
// @lc code=end
