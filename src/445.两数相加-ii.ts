/*
 * @lc app=leetcode.cn id=445 lang=typescript
 *
 * [445] 两数相加 II
 *
 * https://leetcode.cn/problems/add-two-numbers-ii/description/
 *
 * algorithms
 * Medium (60.22%)
 * Likes:    603
 * Dislikes: 0
 * Total Accepted:    123.1K
 * Total Submissions: 204.4K
 * Testcase Example:  '[7,2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 *
 *
 *
 * 示例1：
 *
 *
 *
 *
 * 输入：l1 = [7,2,4,3], l2 = [5,6,4]
 * 输出：[7,8,0,7]
 *
 *
 * 示例2：
 *
 *
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[8,0,7]
 *
 *
 * 示例3：
 *
 *
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表的长度范围为 [1, 100]
 * 0 <= node.val <= 9
 * 输入数据保证链表代表的数字无前导 0
 *
 *
 *
 *
 * 进阶：如果输入链表不能翻转该如何解决？
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
// 先翻转，再相加
// 时间: O(max(n1,n2))
// 空间: O(n1+n2)
function addTwoNumbers1(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // 翻转链表l1
  let prev = l1,
    cur = prev.next;
  prev.next = null;
  while (cur) {
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  l1 = prev;
  // 翻转链表l2
  prev = l2;
  cur = prev.next;
  prev.next = null;
  while (cur) {
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  l2 = prev;
  // 再相加
  prev = null;
  let add = 0;
  while (l1 || l2) {
    let val = (l1?.val || 0) + (l2?.val || 0) + add;
    add = Math.floor(val / 10);
    val %= 10;
    l1 = l1?.next;
    l2 = l2?.next;
    const cur = new ListNode(val);
    cur.next = prev;
    prev = cur;
  }
  if (add) {
    const cur = new ListNode(add);
    cur.next = prev;
    prev = cur;
  }
  return prev;
}

// 栈
// 时间: O(max(n1,n2))
// 空间: O(n1+n2)
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const stack1: number[] = []; // 装l1链表每个节点的值
  const stack2: number[] = []; // 装l2链表每个节点的值
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  // 遍历两个栈，依次出栈值相加
  let prev = null;
  let add = 0;
  while (stack1.length || stack2.length) {
    const val = (stack1.pop() || 0) + (stack2.pop() || 0) + add;
    const cur = new ListNode(val % 10);
    cur.next = prev;
    prev = cur;
    add = Math.floor(val / 10);
  }
  if (add) {
    const cur = new ListNode(add);
    cur.next = prev;
    prev = cur;
  }
  return prev;
}
// @lc code=end
