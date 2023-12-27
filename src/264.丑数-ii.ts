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
  let ans: number = 1;

  for (let i = 1; i <= n; i++) {
    ans = minHeap.pop();
    for (const factor of primeFactors) {
      // 可能存在重复，所以需要一个hash表记录判断一下
      if (!hash.has(factor * ans)) {
        minHeap.push(factor * ans);
        hash.add(ans * factor);
      }
    }
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
      if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[i]) {
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
        this.heap[leftIndex] < this.heap[swapIndex]
      ) {
        swapIndex = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex] < this.heap[swapIndex]
      ) {
        swapIndex = rightIndex;
      }
      if (swapIndex !== i) {
        this.swap(swapIndex, i);
        i = swapIndex;
      } else {
        break;
      }
    }
  }
}

// dp
// 时间: O(n)
// 空间: O(n)
function nthUglyNumber(n: number): number {
  // dp[i]: 第i+1个丑数
  const dp: number[] = new Array(n).fill(1);
  // 第1个丑数是1
  dp[0] = 1;
  // p2: 乘2的指针
  let p2 = 0;
  // p3: 乘3的指针
  let p3 = 0;
  // p5: 乘5的指针
  let p5 = 0;

  for (let i = 1; i < n; i++) {
    // 当前位置i的丑数一定是位置小于i的某一个丑数乘2或3或5得到的
    const next2 = dp[p2] * 2;
    const next3 = dp[p3] * 3;
    const next5 = dp[p5] * 5;
    dp[i] = Math.min(next2, next3, next5);
    if (dp[i] === next2) {
      p2++;
    }
    if (dp[i] === next3) {
      p3++;
    }
    if (dp[i] === next5) {
      p5++;
    }
  }

  return dp[n - 1];
}
// [1,2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,27,30,32,36,40,45,48,50,54]
// 54
// 54
// 60
// @lc code=end
// [1,2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,27,30,32,36,40,45,48,50,54]
