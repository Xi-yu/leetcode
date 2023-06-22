/*
 * @lc app=leetcode.cn id=114 lang=typescript
 *
 * [114] 二叉树展开为链表
 *
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/
 *
 * algorithms
 * Medium (72.99%)
 * Likes:    1491
 * Dislikes: 0
 * Total Accepted:    364K
 * Total Submissions: 498.5K
 * Testcase Example:  '[1,2,5,3,4,null,6]'
 *
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 *
 *
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
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
 * 输入：root = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中结点数在范围 [0, 2000] 内
 * -100
 *
 *
 *
 *
 * 进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
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

/**
 Do not return anything, modify root in-place instead.
 */
// 先前序遍历，后创建链表
// 时间: O(2n)
// 空间: O(n)
function flatten1(root: TreeNode | null): void {
  // 前序遍历
  const stack: TreeNode[] = [];
  const nodes: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      nodes.push(root);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop().right;
  }
  for (let i = 0; i < nodes.length; i++) {
    const cur = nodes[i];
    const right = i + 1 < nodes.length ? nodes[i + 1] : null;
    cur.left = null;
    cur.right = right;
  }
}

// 前序遍历和创建链表同时进行
// 时间: O(n)
// 空间: O(n)
function flatten(root: TreeNode | null): void {
  const stack: TreeNode[] = [];
  if (root) {
    stack.push(root);
  }
  let prev: TreeNode | null = null;
  while (stack.length) {
    const cur = stack.pop();
    if (prev !== null) {
      prev.left = null;
      prev.right = cur;
    }
    prev = cur;
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
}
// @lc code=end
