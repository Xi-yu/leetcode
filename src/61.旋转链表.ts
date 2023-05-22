/*
 * @lc app=leetcode.cn id=61 lang=typescript
 *
 * [61] 旋转链表
 *
 * https://leetcode.cn/problems/rotate-list/description/
 *
 * algorithms
 * Medium (41.50%)
 * Likes:    927
 * Dislikes: 0
 * Total Accepted:    314.3K
 * Total Submissions: 758.3K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 500] 内
 * -100 <= Node.val <= 100
 * 0 <= k <= 2 * 10^9
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

// 时间: O(2n)
// 空间: O(1)
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // 没有节点 或者 只有一个节点 直接返回
  if (!head || !head.next) {
    return head;
  }
  // 先将链表首位相连, 并统计链表的节点数量
  let first = head;
  let last = head;
  let count = 1;
  while (last.next) {
    count++;
    last = last.next;
  }
  last.next = first;

  // 如果k大于等于count, 更新k为: k%count
  // 因为每移动count次, 就回到最初的状态
  k %= count;

  // 然后在 count-1-k 个节点处断开, 返回第 count-k 个节点
  for (let i = 0; i < count - 1 - k; i++) {
    first = first.next;
  }
  last = first.next; // 第 count-k 个节点
  first.next = null;
  return last;
}
// @lc code=end
