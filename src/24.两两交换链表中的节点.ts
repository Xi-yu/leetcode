/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode.cn/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (71.29%)
 * Likes:    1812
 * Dislikes: 0
 * Total Accepted:    622.1K
 * Total Submissions: 872.5K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 100] 内
 * 0 <= Node.val <= 100
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
// 一次模拟遍历
// 时间: O(n)
// 空间: O(1)
function swapPairs(head: ListNode | null): ListNode | null {
  // 因为头节点可能会变化, 所以需要一个哑节点
  const dummyNode = new ListNode(-1, head);
  let cur = dummyNode;
  // 开始遍历, 交换相邻节点的顺序
  // 比如: [1,2,3,4]
  while (cur.next && cur.next.next) {
    // !第一次循环: [1,2,3,4], cur = dummyNode, temp1 = 3
    // *第二次循环: [2,1,3,4], cur = 1, temp1 = null
    const temp1 = cur.next.next.next;
    // !第一次循环: temp2 = 2
    // *第二次循环: temp2 = 4
    const temp2 = cur.next.next;
    // !第一次循环: 2.next = 1
    // *第二次循环: 4.next = 3
    cur.next.next.next = cur.next;
    // !第一次循环: 1.next = 3
    // *第二次循环: 3.next = null
    cur.next.next = temp1;
    // !第一次循环: dummyNode.next = 2
    // *第二次循环: 1.next = 4
    cur.next = temp2;
    // !第一次循环结束: cur = 1 -> [2,1,3,4]
    // *第二次循环结束: cur = 3 -> [2,1,4,3]
    cur = cur.next.next;
  }
  return dummyNode.next;
}
// @lc code=end
