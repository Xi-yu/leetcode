/*
 * @lc app=leetcode.cn id=225 lang=typescript
 *
 * [225] 用队列实现栈
 *
 * https://leetcode.cn/problems/implement-stack-using-queues/description/
 *
 * algorithms
 * Easy (66.42%)
 * Likes:    723
 * Dislikes: 0
 * Total Accepted:    288.6K
 * Total Submissions: 436.3K
 * Testcase Example:  '["MyStack","push","push","top","pop","empty"]\n[[],[1],[2],[],[],[]]'
 *
 * 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。
 *
 * 实现 MyStack 类：
 *
 *
 * void push(int x) 将元素 x 压入栈顶。
 * int pop() 移除并返回栈顶元素。
 * int top() 返回栈顶元素。
 * boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 *
 *
 *
 *
 * 注意：
 *
 *
 * 你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty
 * 这些操作。
 * 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入：
 * ["MyStack", "push", "push", "top", "pop", "empty"]
 * [[], [1], [2], [], [], []]
 * 输出：
 * [null, null, null, 2, 2, false]
 *
 * 解释：
 * MyStack myStack = new MyStack();
 * myStack.push(1);
 * myStack.push(2);
 * myStack.top(); // 返回 2
 * myStack.pop(); // 返回 2
 * myStack.empty(); // 返回 False
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= x <= 9
 * 最多调用100 次 push、pop、top 和 empty
 * 每次调用 pop 和 top 都保证栈不为空
 *
 *
 *
 *
 * 进阶：你能否仅用一个队列来实现栈。
 *
 */

// @lc code=start
// 两个队列
// 时间: O(n)
// 空间: O(n)
class MyStack1 {
  queue1: number[];
  queue2: number[];
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }

  push(x: number): void {
    // 首先push到queue2中
    this.queue2.push(x);
    // 然后把queue1中的push到queue2中
    while (this.queue1.length) {
      this.queue2.push(this.queue1.shift() as number);
    }
    // 最后交换queue1和queue2
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
  }

  pop(): number {
    return this.queue1.shift() as number;
  }

  top(): number {
    return this.queue1[0];
  }

  empty(): boolean {
    return this.queue1.length === 0;
  }
}

// 一个队列
// 时间: O(n)
// 空间: O(n)
class MyStack {
  queue: number[];
  constructor() {
    this.queue = [];
  }

  push(x: number): void {
    // 首先记住入队列前队列的长度
    let n = this.queue.length;
    // 然后入队
    this.queue.push(x);
    // 最后将前n个数字出队，并再入队，这样就把顺序给颠倒了
    while (n > 0) {
      this.queue.push(this.queue.shift() as number);
      n--;
    }
  }

  pop(): number {
    return this.queue.shift() as number;
  }

  top(): number {
    return this.queue[0];
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end
