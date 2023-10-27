/*
 * @lc app=leetcode.cn id=86 lang=typescript
 *
 * [86] 分隔链表
 *
 * https://leetcode.cn/problems/partition-list/description/
 *
 * algorithms
 * Medium (64.14%)
 * Likes:    770
 * Dislikes: 0
 * Total Accepted:    241.5K
 * Total Submissions: 375.4K
 * Testcase Example:  '[1,4,3,2,5,2]\n3'
 *
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 *
 * 你应当 保留 两个分区中每个节点的初始相对位置。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 *
 * 示例 2：
 *
 *
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 200] 内
 * -100
 * -200
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

// 模拟
// 时间: O(n)
// 空间: O(1)
function partition(head: ListNode | null, x: number): ListNode | null {
  let small: ListNode | null = null; // 小于x的节点组成的链表
  let smallHead: ListNode | null = null; // 小于x的节点组成的链表
  let large: ListNode | null = null; // 大于等于x的节点组成的链表
  let largeHead: ListNode | null = null; // 大于等于x的节点组成的链表
  let cur = head;

  while (cur) {
    if (cur.val < x) {
      if (!small) {
        small = new ListNode(cur.val);
        smallHead = small;
      } else {
        small.next = new ListNode(cur.val);
        small = small.next;
      }
    } else {
      if (!large) {
        large = new ListNode(cur.val);
        largeHead = large;
      } else {
        large.next = new ListNode(cur.val);
        large = large.next;
      }
    }
    cur = cur.next;
  }
  if (small) {
    small.next = largeHead;
  }

  return smallHead || largeHead;
}
// @lc code=end
// [1,4,3,2,5,2]
// x=3
// head=1
// cur=2
// small=1 // [1]
// smallHead=1
// large=3 // [4,3]
// largeHead=4
