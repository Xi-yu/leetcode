/*
 * @lc app=leetcode.cn id=958 lang=typescript
 *
 * [958] 二叉树的完全性检验
 *
 * https://leetcode.cn/problems/check-completeness-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (54.58%)
 * Likes:    253
 * Dislikes: 0
 * Total Accepted:    49.2K
 * Total Submissions: 90.2K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给定一个二叉树的 root ，确定它是否是一个 完全二叉树 。
 *
 * 在一个 完全二叉树 中，除了最后一个关卡外，所有关卡都是完全被填满的，并且最后一个关卡中的所有节点都是尽可能靠左的。它可以包含 1 到 2^h
 * 节点之间的最后一级 h 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,6]
 * 输出：true
 * 解释：最后一层前的每一层都是满的（即，结点值为 {1} 和 {2,3} 的两层），且最后一层中的所有结点（{4,5,6}）都尽可能地向左。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：false
 * 解释：值为 7 的结点没有尽可能靠向左侧。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树的结点数在范围  [1, 100] 内。
 * 1 <= Node.val <= 1000
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
// 层序遍历，给每个节点编号，根节点编号为0，左子节点编号为 (n<<1)+1，右子节点编号为 (n<<1)+2
// 遍历结束后，return 最后一个节点的编号 + 1 === 节点数量
// 时间: O(n)
// 空间: O(n)
function isCompleteTree(root: TreeNode): boolean {
  interface Node {
    node: TreeNode;
    num: number;
  }
  const queue: Node[] = [];
  // 最后一个节点的编号
  let lastNodeNum = 0;
  // 所有节点数量
  let nodeCount = 0;
  if (root) {
    // 根节点编号为0
    queue.push({ node: root, num: 0 });
    nodeCount = 1;
  }
  while (queue.length) {
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      const { node, num } = queue.shift() as Node;
      if (node.left) {
        lastNodeNum = (num << 1) + 1;
        nodeCount++;
        queue.push({ node: node.left, num: lastNodeNum });
      }
      if (node.right) {
        lastNodeNum = (num << 1) + 2;
        nodeCount++;
        queue.push({ node: node.right, num: lastNodeNum });
      }
      if (lastNodeNum + 1 !== nodeCount) {
        // 只要出现，就提前退出循环，后面不需要继续判读了
        return false;
      }
    }
  }

  return lastNodeNum + 1 === nodeCount;
}
// @lc code=end
