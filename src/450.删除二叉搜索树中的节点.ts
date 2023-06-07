/*
 * @lc app=leetcode.cn id=450 lang=typescript
 *
 * [450] 删除二叉搜索树中的节点
 *
 * https://leetcode.cn/problems/delete-node-in-a-bst/description/
 *
 * algorithms
 * Medium (52.39%)
 * Likes:    1161
 * Dislikes: 0
 * Total Accepted:    206.7K
 * Total Submissions: 394.7K
 * Testcase Example:  '[5,3,6,2,4,null,7]\n3'
 *
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key
 * 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
 *
 * 一般来说，删除节点可分为两个步骤：
 *
 *
 * 首先找到需要删除的节点；
 * 如果找到了，删除它。
 *
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：root = [5,3,6,2,4,null,7], key = 3
 * 输出：[5,4,6,2,null,null,7]
 * 解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
 * 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
 * 另一个正确答案是 [5,2,6,null,4,null,7]。
 *
 *
 *
 *
 * 示例 2:
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], key = 0
 * 输出: [5,3,6,2,4,null,7]
 * 解释: 二叉树不包含值为 0 的节点
 *
 *
 * 示例 3:
 *
 *
 * 输入: root = [], key = 0
 * 输出: []
 *
 *
 *
 * 提示:
 *
 *
 * 节点数的范围 [0, 10^4].
 * -10^5 <= Node.val <= 10^5
 * 节点值唯一
 * root 是合法的二叉搜索树
 * -10^5 <= key <= 10^5
 *
 *
 *
 *
 * 进阶： 要求算法时间复杂度为 O(h)，h 为树的高度。
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
// 模拟
// 时间: O(h)
// 空间: O(1)
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) {
    return null;
  }
  // 新建一个虚拟节点，因为根节点可能被删除
  const dummyNode = new TreeNode(-1, root);
  // 找到要删除的节点
  let cur = root;
  let parent = dummyNode;
  let flag = "left";
  while (cur && cur.val !== key) {
    if (cur.val < key) {
      parent = cur;
      flag = "right";
      cur = cur.right;
    } else {
      parent = cur;
      flag = "left";
      cur = cur.left;
    }
  }
  // 如果cur不为null，找到了
  if (cur !== null) {
    if (cur.right) {
      // 如果存在右子节点
      // 将父级指向其右子节点
      parent[flag] = cur.right;
      // 并且将该节点的左子节点接到其右子树的最左节点的左子节点上
      const left = cur.left;
      let temp = cur.right;
      while (temp.left) {
        temp = temp.left;
      }
      temp.left = left;
    } else if (cur.left) {
      // 如果不存在右子节点
      // 存在左子节点
      // 将父级指向其左子节点
      parent[flag] = cur.left;
    } else {
      // 左右子节点都不存在
      // 将父级指向null
      parent[flag] = null;
    }
  }
  return dummyNode.left;
}
// @lc code=end
