/*
 * @lc app=leetcode.cn id=328 lang=typescript
 *
 * [328] 奇偶链表
 *
 * https://leetcode.cn/problems/odd-even-linked-list/description/
 *
 * algorithms
 * Medium (65.10%)
 * Likes:    707
 * Dislikes: 0
 * Total Accepted:    207.3K
 * Total Submissions: 319K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
 *
 * 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。
 *
 * 请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
 *
 * 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: head = [1,2,3,4,5]
 * 输出: [1,3,5,2,4]
 *
 * 示例 2:
 *
 *
 *
 *
 * 输入: head = [2,1,3,5,6,4,7]
 * 输出: [2,3,6,7,1,5,4]
 *
 *
 *
 * 提示:
 *
 *
 * n ==  链表中的节点数
 * 0 <= n <= 10^4
 * -10^6 <= Node.val <= 10^6
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
// 双指针
// 时间: O(n)
// 空间: O(1)
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next || !head.next.next) {
    // 没有节点、只有一个节点、只有两个节点
    // 直接返回head
    return head;
  }
  let odd = head,
    evenHead = head.next,
    even = head.next;
  while (odd && odd.next && odd.next.next) {
    odd.next = odd.next.next;
    odd = odd.next;
    if (even.next) {
      even.next = even.next.next;
      even = even.next;
    }
  }
  odd.next = evenHead;
  return head;
}
// @lc code=end
