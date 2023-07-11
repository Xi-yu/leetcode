/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前 K 个高频元素
 *
 * https://leetcode.cn/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (63.52%)
 * Likes:    1603
 * Dislikes: 0
 * Total Accepted:    441.3K
 * Total Submissions: 694.5K
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1], k = 1
 * 输出: [1]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * k 的取值范围是 [1, 数组中不相同的元素的个数]
 * 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 *
 *
 *
 *
 * 进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
 *
 */

// @lc code=start
// 哈希+大顶堆
// 时间: O(n+n*logn+k*logn = nlogn)
// 空间: O(n)
function topKFrequent1(nums: number[], k: number): number[] {
  // 新建一个哈希，保存每个数和其出现次数的键值对
  // 时间: O(n) 空间: O(n)
  const hash: Map<number, number> = new Map();
  for (const n of nums) {
    hash.set(n, (hash.get(n) || 0) + 1);
  }
  // 新建一个大顶堆
  // 时间: O(1) 空间: O(1)
  const maxHeap = new MaxHeap();
  // 遍历哈希，将次数push到大顶堆中
  // 根据次数构建大顶堆
  // 时间: O(n*logn) 空间: O(1)
  hash.forEach((v, k) => {
    // v: 出现的次数
    // k: 整数
    // 将k v都push进去，v用于比较构建大顶堆；k用于pop时统计前K个高频的整数
    maxHeap.push([k, v]);
  });
  const ans: number[] = [];
  // pop大顶堆中前K个
  // 时间: O(k*logn) 空间: O(1)
  while (k > 0) {
    ans.push(maxHeap.pop()[0]);
    k--;
  }

  return ans;
}
// 大顶堆
class MaxHeap {
  heap: number[][];
  constructor(arr: number[][] = []) {
    this.heap = arr;
    this.buildHeap();
  }
  buildHeap() {
    const len = this.heap.length;
    if (len < 2) {
      return;
    }
    const startIndex = (len >> 1) - 1;
    for (let i = startIndex; i >= 0; i--) {
      this.siftDown(i, len - 1);
    }
  }
  push(n: number[]) {
    this.heap.push(n);
    this.siftUp();
  }
  siftUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const parentIndex = (i - 1) >> 1;
      if (this.heap[parentIndex][1] < this.heap[i][1]) {
        [this.heap[parentIndex], this.heap[i]] = [
          this.heap[i],
          this.heap[parentIndex],
        ];
        i = parentIndex;
      } else {
        break;
      }
    }
  }
  pop() {
    const first = this.heap[0];
    if (first !== undefined) {
      const last = this.heap.pop();
      if (first !== last) {
        this.heap[0] = last as number[];
        this.siftDown(0, this.heap.length - 1);
      }
      return first;
    } else {
      return [];
    }
  }
  siftDown(startIndex: number, endIndex: number) {
    let i = startIndex;
    while ((i << 1) + 1 <= endIndex) {
      let swapIndex = i;
      const leftChildIndex = (i << 1) + 1;
      const rightChildIndex = leftChildIndex + 1;
      if (this.heap[leftChildIndex][1] > this.heap[swapIndex][1]) {
        swapIndex = leftChildIndex;
      }
      if (
        rightChildIndex <= endIndex &&
        this.heap[rightChildIndex][1] > this.heap[swapIndex][1]
      ) {
        swapIndex = rightChildIndex;
      }
      if (swapIndex !== i) {
        [this.heap[i], this.heap[swapIndex]] = [
          this.heap[swapIndex],
          this.heap[i],
        ];
        i = swapIndex;
      } else {
        break;
      }
    }
  }
}

// 哈希+小顶堆
// 时间: O(nlogk)
// 空间: O(n)
function topKFrequent(nums: number[], k: number): number[] {
  // 新建一个哈希，保存数字和出现次数的键值对
  // 时间: O(n) 空间: O(n)
  const hash = new Map();
  for (const n of nums) {
    hash.set(n, (hash.get(n) || 0) + 1);
  }
  // 新建小顶堆
  // 时间: O(1) 空间: O(1)
  const minHeap = new MinHeap([]);
  // 遍历哈希，将数字和出现次数push到小顶堆中
  // 时间: O(n*logk) 空间: O(1)
  hash.forEach((v, key) => {
    minHeap.push([key, v]);
    // 如果小顶堆的元素数量超过k了，则堆顶元素一定不属于前k个
    if (minHeap.len() > k) {
      minHeap.pop();
    }
  });

  // 哈希遍历结束，小顶堆中的元素就是前k个高频元素
  // 时间: O(k) 空间: O(1)
  const ans: number[] = [];
  for (const [k] of minHeap.heap) {
    ans.push(k);
  }

  return ans;
}
// 小顶堆
class MinHeap {
  heap: number[][];
  constructor(arr: number[][]) {
    this.heap = arr;
    this.buildHeap();
  }
  len() {
    return this.heap.length;
  }
  buildHeap() {
    const len = this.len();
    if (len < 2) {
      return;
    }
    const startIndex = (len >> 1) - 1;
    for (let i = startIndex; i >= 0; i--) {
      this.siftDown(i);
    }
  }
  siftDown(startIndex: number) {
    const len = this.len();
    let i = startIndex;
    while ((i << 1) + 1 <= len - 1) {
      let swapIndex = i;
      const leftChildIndex = (i << 1) + 1;
      const rightChildIndex = leftChildIndex + 1;
      if (this.heap[leftChildIndex][1] < this.heap[swapIndex][1]) {
        swapIndex = leftChildIndex;
      }
      if (
        rightChildIndex <= len - 1 &&
        this.heap[rightChildIndex][1] < this.heap[swapIndex][1]
      ) {
        swapIndex = rightChildIndex;
      }
      if (i !== swapIndex) {
        [this.heap[i], this.heap[swapIndex]] = [
          this.heap[swapIndex],
          this.heap[i],
        ];
        i = swapIndex;
      } else {
        break;
      }
    }
  }
  push(n: number[]) {
    this.heap.push(n);
    this.siftUp();
  }
  siftUp() {
    let i = this.len() - 1;
    while (i > 0) {
      const parentIndex = (i - 1) >> 1;
      if (this.heap[parentIndex][1] > this.heap[i][1]) {
        [this.heap[i], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[i],
        ];
        i = parentIndex;
      } else {
        break;
      }
    }
  }
  pop() {
    const first = this.heap[0];
    if (first !== undefined) {
      const last = this.heap.pop() as number[];
      if (first !== last) {
        this.heap[0] = last;
        this.siftDown(0);
      }
      return first;
    } else {
      return [];
    }
  }
}
// @lc code=end
