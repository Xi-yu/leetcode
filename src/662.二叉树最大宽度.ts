/*
 * @lc app=leetcode.cn id=662 lang=typescript
 *
 * [662] 二叉树最大宽度
 *
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/description/
 *
 * algorithms
 * Medium (43.64%)
 * Likes:    562
 * Dislikes: 0
 * Total Accepted:    87.5K
 * Total Submissions: 200.4K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给你一棵二叉树的根节点 root ，返回树的 最大宽度 。
 *
 * 树的 最大宽度 是所有层中最大的 宽度 。
 *
 *
 *
 * 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的
 * null 节点，这些 null 节点也计入长度。
 *
 * 题目数据保证答案将会在  32 位 带符号整数范围内。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,3,2,5,3,null,9]
 * 输出：4
 * 解释：最大宽度出现在树的第 3 层，宽度为 4 (5,3,null,9) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,3,2,5,null,null,9,6,null,7]
 * 输出：7
 * 解释：最大宽度出现在树的第 4 层，宽度为 7 (6,null,null,null,null,null,7) 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,3,2,5]
 * 输出：2
 * 解释：最大宽度出现在树的第 2 层，宽度为 2 (3,2) 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目范围是 [1, 3000]
 * -100 <= Node.val <= 100
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
 *         this.index = 0
 *     }
 * }
 */
// 广度优先遍历 - bfs
// 时间: O(n)
// 空间: O(n)
function widthOfBinaryTree(root: TreeNode | null): number {
  // 层序遍历
  // 遍历出每一层的节点
  // 计算最宽的一层
  // 通过给节点编号来快速计算每一层的宽度
  // 根节点编号为1，左节点编号为2 * 1，右节点编号为2 * 1 + 1，以此类推
  // 所以每一层的宽度为：最右边的节点的编号 - 最左边的节点的编号 + 1
  const queue: { node: TreeNode; index: bigint }[] = [];
  // Number类型会溢出，所以用BigInt类型
  let ans: bigint = 0n;
  if (root) {
    // 给根节点编号为1，并推入队列
    queue.push({ node: root, index: 1n });
  }
  while (queue.length) {
    const len = queue.length;
    // 计算该层的宽度
    const min: bigint = queue[0].index;
    const max: bigint = queue[len - 1].index;
    const cur: bigint = max - min + 1n;
    // 用更大的值来更新答案
    if (cur > ans) {
      ans = cur;
    }
    // 获取下一层的节点
    for (let i = 0; i < len; i++) {
      const { node, index } = queue.shift();
      console.log(index);
      if (node.left) {
        // 给左子节点编号，并推入队列
        queue.push({ node: node.left, index: index * 2n });
      }
      if (node.right) {
        // 给右子节点编号，并推入队列
        queue.push({ node: node.right, index: index * 2n + 1n });
      }
    }
  }
  // BigInt转为Number
  return Number(ans);
}
// @lc code=end
