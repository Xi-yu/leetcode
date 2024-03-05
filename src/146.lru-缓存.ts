/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 *
 * https://leetcode.cn/problems/lru-cache/description/
 *
 * algorithms
 * Medium (53.45%)
 * Likes:    3089
 * Dislikes: 0
 * Total Accepted:    592.8K
 * Total Submissions: 1.1M
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 
 * 实现 LRUCache 类：
 * 
 * 
 * 
 * 
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组
 * key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 
 * 
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 * 
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 
 * 解释
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1
 * lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= capacity <= 3000
 * 0 <= key <= 10000
 * 0 <= value <= 10^5
 * 最多调用 2 * 10^5 次 get 和 put
 * 
 * 
 */

// @lc code=start
// 哈希表: 利用Map能够记住键的原始插入顺序
// 时间: O(1)
// 空间: O(capacity)
class LRUCache1 {
  hash: Map<number, number>;
  size: number;
  constructor(capacity: number) {
    this.hash = new Map();
    this.size = capacity;
  }

  // 时间: O(1)
  get(key: number): number {
    if (this.hash.has(key)) {
      // 重新删除插入一次
      // 这样插入顺序就在最后了
      const value = this.hash.get(key) as number;
      this.hash.delete(key);
      this.hash.set(key, value);
      return value;
    } else {
      return -1;
    }
  }

  // 时间: O(1)
  put(key: number, value: number): void {
    if (this.hash.size === this.size && !this.hash.has(key)) {
      // 超过限制了，就把第一个插入的key删除
      for (const [k, _] of this.hash) {
        this.hash.delete(k);
        break;
      }
    }
    // 如果key存在,重新删除插入一次
    // 这样插入顺序就在最后了
    if (this.hash.has(key)) {
      this.hash.delete(key);
    }
    this.hash.set(key, value);
  }
}

// 哈希表+双向链表
// 时间: O(1)
// 空间: O(2capacity)
class LRUCache {
  size: number;
  hash: Map<number, DoublyLinkedList>;
  doublyLinkedListHead: DoublyLinkedList;
  doublyLinkedListTail: DoublyLinkedList;
  constructor(capacity: number) {
    this.size = capacity;
    this.hash = new Map();
    this.doublyLinkedListHead = new DoublyLinkedList(-1, -1);
    this.doublyLinkedListTail = new DoublyLinkedList(10001, 100001);
    this.doublyLinkedListHead.next = this.doublyLinkedListTail;
    this.doublyLinkedListTail.prev = this.doublyLinkedListHead;
  }

  // 时间: O(1)
  get(key: number): number {
    const node = this.hash.get(key);
    if (node) {
      // 将node从双向链表中删除
      const prev = node.prev as DoublyLinkedList;
      const next = node.next as DoublyLinkedList;
      prev.next = next;
      next.prev = prev;
      // 将node插入到双向链表的头部
      const head = this.doublyLinkedListHead.next as DoublyLinkedList;
      this.doublyLinkedListHead.next = node;
      node.prev = this.doublyLinkedListHead;
      node.next = head;
      head.prev = node;

      return node.value as number;
    } else {
      return -1;
    }
  }

  // 时间: O(1)
  put(key: number, value: number): void {
    let node: DoublyLinkedList;
    if (!this.hash.has(key)) {
      node = new DoublyLinkedList(key, value);
      this.hash.set(key, node);
    } else {
      node = this.hash.get(key) as DoublyLinkedList;
      // 更新value
      node.value = value;
      // 将node从双向链表中删除
      const prev = node.prev as DoublyLinkedList;
      const next = node.next as DoublyLinkedList;
      prev.next = next;
      next.prev = prev;
    }
    // 将node插入到双向链表的头部
    const head = this.doublyLinkedListHead.next as DoublyLinkedList;
    this.doublyLinkedListHead.next = node;
    node.prev = this.doublyLinkedListHead;
    node.next = head;
    head.prev = node;
    if (this.hash.size > this.size) {
      // 超过限制了，就把双向链表的最后一个删除
      const lastNode = this.doublyLinkedListTail.prev as DoublyLinkedList;
      this.hash.delete(lastNode.key);
      const prev = lastNode.prev as DoublyLinkedList;
      prev.next = this.doublyLinkedListTail;
      this.doublyLinkedListTail.prev = prev;
    }
  }
}
// 双向链表
class DoublyLinkedList {
  key: number;
  value: number;
  prev?: DoublyLinkedList;
  next?: DoublyLinkedList;
  constructor(
    key: number,
    value: number,
    prev?: DoublyLinkedList,
    next?: DoublyLinkedList
  ) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
