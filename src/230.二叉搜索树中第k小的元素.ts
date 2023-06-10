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
// 中序（左根右）遍历二叉树，结果就是从小到大排列的数组
// 时间: O(logn+k)
// 空间: O(logn)
function kthSmallest1(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    k--;
    if (k === 0) {
      break;
    }
    root = root.right;
  }

  return root.val;
}

// 如果要频繁的查找，需要先遍历一次二叉树，记录所有节点的子节点数量（包括节点自己）
// 然后每次查找只需要logn的时间复杂度
// 时间: O(n+logn)
// 空间: O(n)
function kthSmallest(root: TreeNode | null, k: number): number {
  const binaryCount = new BinaryCount(root);
  return binaryCount.kthSmallest(k);
}

class BinaryCount {
  root: TreeNode;
  nodeCountHash: Map<TreeNode, number>;
  constructor(root) {
    this.root = root;
    this.nodeCountHash = new Map();
    this.count(this.root);
  }
  count(node: TreeNode): number {
    let count = 0;
    if (node) {
      count = 1 + this.count(node.left) + this.count(node.right);
    }
    this.nodeCountHash.set(node, count);
    return this.nodeCountHash.get(node) || 0;
  }
  kthSmallest(k: number): number {
    let cur = this.root;
    while (cur) {
      // 该节点的左子树的节点数量
      const leftCount = this.nodeCountHash.get(cur.left) || 0;
      if (k === leftCount + 1) {
        // 如果该节点的左子树的数量+1===k，表示该节点就是第k小的节点
        return cur.val;
      } else if (k < leftCount + 1) {
        // 如果该节点的左子树的数量+1>k，表示第k小的节点在该节点的左子树中，继续遍历其左子树
        cur = cur.left;
      } else {
        // 如果该节点的左子树的数量+1<k，表示第k小的节点在该节点的右子树中，继续遍历其右子树
        // 但是需要更新k，因为左子树所有的节点都比第k小的节点小，所以需要把左子树的节点排除在外
        // 所以，就是找其右子树中第k-leftCount-1小的节点了
        k = k - leftCount - 1;
        cur = cur.right;
      }
    }
    return 0;
  }
}
// @lc code=end
