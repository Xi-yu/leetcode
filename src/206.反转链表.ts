/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 *
 * https://leetcode.cn/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (73.49%)
 * Likes:    3517
 * Dislikes: 0
 * Total Accepted:    1.8M
 * Total Submissions: 2.4M
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,2]
 * 输出：[2,1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围是 [0, 5000]
 * -5000
 *
 *
 *
 *
 * 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
 *
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// 递归
// 时间: O(n)
// 空间: O(n)
function reverseList1(head: ListNode | null): ListNode | null {
  let ans = null;

  function dfs(node: ListNode | null) {
    if (node) {
      const next = node.next;
      node.next = ans;
      ans = node;
      dfs(next);
    }
  }

  dfs(head);

  return ans;
}

// 迭代
// 时间: O(n)
// 空间: O(1)
function reverseList(head: ListNode | null): ListNode | null {
  let ans = null;

  while (head) {
    const next = head.next;
    head.next = ans;
    ans = head;
    head = next;
  }

  return ans;
}
// @lc code=end
