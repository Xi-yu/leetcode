/*
 * @lc app=leetcode.cn id=572 lang=typescript
 *
 * [572] 另一棵树的子树
 *
 * https://leetcode.cn/problems/subtree-of-another-tree/description/
 *
 * algorithms
 * Easy (47.58%)
 * Likes:    925
 * Dislikes: 0
 * Total Accepted:    175.8K
 * Total Submissions: 370K
 * Testcase Example:  '[3,4,5,1,2]\n[4,1,2]'
 *
 *
 *
 * 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true
 * ；否则，返回 false 。
 *
 * 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,4,5,1,2], subRoot = [4,1,2]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * root 树上的节点数量范围是 [1, 2000]
 * subRoot 树上的节点数量范围是 [1, 1000]
 * -10^4
 * -10^4
 *
 *
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
// 深度优先暴力匹配
// 时间: O(s*t)
// 空间: O(max(logs, logt))
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // 深度优先遍历（根左右）
  const stack: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      if (root.val === subRoot.val && isSame(root, subRoot)) {
        return true;
      }
      stack.push(root);
      root = root.left;
    }
    root = stack.pop().right;
  }
  return false;
}
function isSame(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // 递归判断两棵树是否相同
  if (root === null && subRoot === null) {
    return true;
  }
  if (root === null || subRoot === null) {
    return false;
  }
  return (
    root.val === subRoot.val &&
    isSame(root.left, subRoot.left) &&
    isSame(root.right, subRoot.right)
  );
}
// @lc code=end
