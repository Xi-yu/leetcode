/*
 * @lc app=leetcode.cn id=106 lang=typescript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (72.24%)
 * Likes:    1044
 * Dislikes: 0
 * Total Accepted:    290K
 * Total Submissions: 402.2K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder
 * 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
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
// 递归
// 时间: O(n^2) 递归处理所有节点需要O(n), 每次递归查找下标处理数组需要O(n)
// 空间: O(nlogn) 递归处理所有节点需要O(logn), 每次递归查找下标处理数组需要O(n)
function buildTree1(inorder: number[], postorder: number[]): TreeNode | null {
  // 后序遍历结果的最后一个是根节点
  // 利用这个特性：
  // 1.首先在后序遍历数组中找到根节点
  // 2.再根据根节点将中序遍历数组，分为左子树数组和右子树数组，再从对应的后序遍历数组中，找到左子树的根节点和右子树的根节点
  // 3.再分别递归处理左子树数组和右子树数组
  function help(inorder: number[], postorder: number[]) {
    if (inorder.length === 0) {
      // inorder和postorder的节点数量一定是一样的
      // 没有节点，返回null
      return null;
    }
    const rootVal = postorder.pop() as number; // 根节点值
    const root = new TreeNode(rootVal); // 构造根节点
    // 找到根节点在inorder中的位置
    // 因为每个节点的值都不同，所以一定能找到唯一的一个
    const i = inorder.indexOf(rootVal);
    // 根据根节点的位置，分为左右子树节点数组
    const leftInorder = inorder.slice(0, i);
    const rightInorder = inorder.slice(i + 1);
    // 根据左右子树的前序遍历数组，找到对应的左右子树后序遍历数组
    const leftPostorder = postorder.slice(0, leftInorder.length);
    const rightPostorder = postorder.slice(leftInorder.length);
    // 继续递归处理左右子树
    root.left = help(leftInorder, leftPostorder);
    root.right = help(rightInorder, rightPostorder);
    return root;
  }

  return help(inorder, postorder);
}

// 递归+哈希优化
// 时间: O(2n) 新建哈希需要O(n), 递归处理所有节点需要O(n)
// 空间: O(n+logn) 新建哈希需要O(n), 递归处理所有节点需要O(logn)
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // 后序遍历结果的最后一个是根节点，并且从右往左，依次是每次递归时右子树的根节点，然后是每次递归时左子树的根节点
  // 利用这个特性：
  // 1.首先在后序遍历数组中找到根节点
  // 2.再根据根节点将中序遍历数组，分为左子树数组和右子树数组，再从对应的后序遍历数组中，找到左子树的根节点和右子树的根节点
  // 3.再分别递归处理左子树数组和右子树数组

  // 用一个哈希，保存inorder的节点值和下标对，可以在o(1)时间找到某个节点值对应的下标
  const hash = new Map();
  for (let i = 0; i < inorder.length; i++) {
    hash.set(inorder[i], i);
  }

  // 需要一个指向每次递归根节点的下标，最开始的根节点是postorder的最后一位
  let rootIndex = postorder.length - 1;

  // 递归函数的参数改为，inorder的开始下标和结束下标
  function help(start: number, end: number) {
    if (start > end) {
      // 没有节点，返回null
      return null;
    }
    const rootVal = postorder[rootIndex]; // 根节点值
    // 更新根节点下标
    rootIndex--;
    const root = new TreeNode(rootVal); // 构造根节点
    // 找到根节点在inorder中的位置
    // 因为每个节点的值都不同，所以一定能找到唯一的一个
    const i = hash.get(rootVal);
    // 继续递归处理左右子树
    // 必须先遍历右子树，再遍历左子树，因为这样rootIndex才会指向每次递归的根节点
    root.right = help(i + 1, end);
    root.left = help(start, i - 1);
    return root;
  }

  return help(0, inorder.length - 1);
}
// @lc code=end
