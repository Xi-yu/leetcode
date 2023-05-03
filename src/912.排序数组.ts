/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 *
 * https://leetcode.cn/problems/sort-an-array/description/
 *
 * algorithms
 * Medium (52.67%)
 * Likes:    836
 * Dislikes: 0
 * Total Accepted:    528.5K
 * Total Submissions: 1M
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个整数数组 nums，请你将该数组升序排列。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5 * 10^4
 * -5 * 10^4 <= nums[i] <= 5 * 10^4
 *
 *
 */

// @lc code=start
// 堆排序
// 将数组构建为大顶堆, 然后排序
// 时间: O(nlogn)
// 空间: O(1)
function sortArray1(nums: number[]): number[] {
  const maxHeap = new MaxHeap(nums);
  maxHeap.sort();
  return nums;
}
// 升序需要大顶堆
class MaxHeap {
  heap: number[];
  constructor(arr: number[]) {
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
  siftDown(startIndex: number, endIndex: number) {
    // 递归调整堆, 有O(logn)的调用栈空间占用
    // const leftChildIndex = (startIndex << 1) + 1;
    // const rightChildIndex = leftChildIndex + 1;
    // let swapIndex = startIndex;
    // if (
    //   leftChildIndex <= endIndex &&
    //   this.heap[swapIndex] < this.heap[leftChildIndex]
    // ) {
    //   swapIndex = leftChildIndex;
    // }
    // if (
    //   rightChildIndex <= endIndex &&
    //   this.heap[swapIndex] < this.heap[rightChildIndex]
    // ) {
    //   swapIndex = rightChildIndex;
    // }
    // if (swapIndex !== startIndex) {
    //   [this.heap[swapIndex], this.heap[startIndex]] = [
    //     this.heap[startIndex],
    //     this.heap[swapIndex],
    //   ];
    //   this.siftDown(swapIndex, endIndex);
    // }

    // 循环调整堆, 空间降为O(1)
    let index = startIndex;
    while ((index << 1) + 1 <= endIndex) {
      let leftChildIndex = (index << 1) + 1;
      let rightChildIndex = leftChildIndex + 1;
      let swapIndex = index;
      if (
        leftChildIndex <= endIndex &&
        this.heap[leftChildIndex] > this.heap[swapIndex]
      ) {
        swapIndex = leftChildIndex;
      }
      if (
        rightChildIndex <= endIndex &&
        this.heap[rightChildIndex] > this.heap[swapIndex]
      ) {
        swapIndex = rightChildIndex;
      }
      if (swapIndex !== index) {
        [this.heap[swapIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[swapIndex],
        ];
        index = swapIndex;
      } else {
        break;
      }
    }
  }
  sort() {
    const len = this.heap.length;
    if (len < 2) {
      return;
    }
    for (let i = len - 1; i >= 1; i--) {
      [this.heap[0], this.heap[i]] = [this.heap[i], this.heap[0]];
      this.siftDown(0, i - 1);
    }
  }
}

// 归并排序
// 将数组分为两个子数组, 将两个子数组排序后, 线性合并
// 不断递归执行该操作
// 时间: O(nlogn)
// 空间: O(n+logn) = O(n)
function sortArray2(nums: number[]): number[] {
  const len: number = nums.length;
  if (len < 2) {
    return nums;
  }
  const mid: number = len >> 1;
  const leftArr: number[] = sortArray2(nums.slice(0, mid));
  const rightArr: number[] = sortArray2(nums.slice(mid));
  const m: number = leftArr.length;
  const n: number = rightArr.length;
  const ans: number[] = [];
  let i: number = 0,
    j: number = 0;
  while (i < m && j < n) {
    if (leftArr[i] < rightArr[j]) {
      ans.push(leftArr[i++]);
    } else {
      ans.push(rightArr[j++]);
    }
  }
  while (i < m) {
    ans.push(leftArr[i++]);
  }
  while (j < n) {
    ans.push(rightArr[j++]);
  }
  return ans;
}

// 快速排序
// 将数组划分为前后两部分,前部分比后部分小
// 在递归处理前后两部分的数据
// 时间: O(nlogn)
// 空间: O(logn)
function sortArray(nums: number[]): number[] {
  quickSort(nums, 0, nums.length - 1);
  return nums;
}
function quickSort(nums: number[], start: number, end: number): void {
  if (start >= end) {
    // 递归结束
    return;
  }
  const mid: number = randomPartition(nums, start, end); // 随机选择mid, mid左侧的数比nums[mid]小, mid右侧的数比nums[mid]大
  quickSort(nums, start, mid - 1); // 递归处理mid左侧的部分
  quickSort(nums, mid + 1, end); // 递归处理mid右侧的部分
}
function randomPartition(nums: number[], start: number, end: number): number {
  // 随机获取pivot
  const pivotIndex: number =
    start + Math.floor(Math.random() * (end - start + 1));
  // pivot放在最左边
  [nums[start], nums[pivotIndex]] = [nums[pivotIndex], nums[start]];
  // 划分数组未前后两部分
  // 前部分小于pivot
  // 后部分大于pivot
  const pivot = nums[start];
  let i = start,
    j = end;
  while (i < j) {
    // 找到右边第一个小于pivot
    while (i < j && nums[j] >= pivot) {
      j--;
    }
    // j移动到i
    nums[i] = nums[j];
    // 找到左边第一个大于pivot
    while (i < j && nums[i] <= pivot) {
      i++;
    }
    // i移动到j
    nums[j] = nums[i];
  }
  // 循环结束, i===j, 即是中间点
  nums[i] = pivot;
  return i;
}
// @lc code=end
