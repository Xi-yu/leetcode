/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 *
 * https://leetcode.cn/problems/ugly-number-ii/description/
 *
 * algorithms
 * Medium (58.66%)
 * Likes:    1130
 * Dislikes: 0
 * Total Accepted:    166.4K
 * Total Submissions: 285.3K
 * Testcase Example:  '10'
 *
 * 给你一个整数 n ，请你找出并返回第 n 个 丑数 。
 *
 * 丑数 就是质因子只包含 2、3 和 5 的正整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 10
 * 输出：12
 * 解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：1
 * 解释：1 通常被视为丑数。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 1690
 *
 *
 */

// @lc code=start
// 最小堆+hash
// 时间: O(nlogn)
// 空间: O(n)
function nthUglyNumber1(n: number): number {
  const primeFactors = [2, 3, 5];
  const hash: Set<number> = new Set();
  const minHeap = new MinHeap();
  // 初始化把最小的丑数放进去
  minHeap.push(1);
  hash.add(1);
  let ans: number = 1;

  for (let i = 0; i < n; i++) {
    const min = minHeap.pop();
    // 可能存在重复，所以需要一个hash表记录判断一下
    for (const factor of primeFactors) {
      if (!hash.has(min * factor)) {
        minHeap.push(min * factor);
        hash.add(min * factor);
      }
    }
    ans = min;
  }

  return ans;
}

class MinHeap {
  heap: number[];
  constructor() {
    this.heap = [];
  }
  getParentIndex(i: number): number {
    return (i - 1) >> 1;
  }
  getLeftIndex(i: number): number {
    return (i << 1) + 1;
  }
  getRightIndex(i: number): number {
    return (i << 1) + 2;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  push(v: number) {
    this.heap.push(v);
    this.siftUp(this.heap.length - 1);
  }
  pop(): number {
    const first = this.heap[0];
    const last = this.heap.pop() as number;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return first;
  }
  peek(): number | undefined {
    return this.heap[0];
  }
  size(): number {
    return this.heap.length;
  }
  siftUp(startIndex: number) {
    let i = startIndex;
    while (i > 0) {
      const parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        this.swap(i, parentIndex);
        i = parentIndex;
      } else {
        break;
      }
    }
  }
  siftDown(startIndex: number) {
    let i = startIndex;
    while (i < this.heap.length - 1) {
      const leftIndex = this.getLeftIndex(i);
      const rightIndex = this.getRightIndex(i);
      let swapIndex = i;
      if (
        leftIndex < this.heap.length &&
        this.heap[swapIndex] > this.heap[leftIndex]
      ) {
        swapIndex = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[swapIndex] > this.heap[rightIndex]
      ) {
        swapIndex = rightIndex;
      }
      if (swapIndex !== i) {
        [this.heap[swapIndex], this.heap[i]] = [
          this.heap[i],
          this.heap[swapIndex],
        ];
        i = swapIndex;
      } else {
        break;
      }
    }
  }
}

// dp
// 时间: O()
// 空间: O()
function nthUglyNumber(n: number): number {
  const primeFactors = [2, 3, 5];
  // dp[i]: 第i+1个丑数
  const dp: number[] = new Array(n).fill(1);

  // 第一个丑数是1, 从第二个开始计算
  for (let i = 1; i < n; i++) {}

  return dp[n - 1];
}
// @lc code=end
// [1,2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,27,30,32,36,40,45,48,50,54]
