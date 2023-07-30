/*
 * @lc app=leetcode.cn id=134 lang=typescript
 *
 * [134] 加油站
 *
 * https://leetcode.cn/problems/gas-station/description/
 *
 * algorithms
 * Medium (51.77%)
 * Likes:    1320
 * Dislikes: 0
 * Total Accepted:    264.4K
 * Total Submissions: 518.4K
 * Testcase Example:  '[1,2,3,4,5]\n[3,4,5,1,2]'
 *
 * 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 *
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 *
 * 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一
 * 的。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * 输出: 3
 * 解释:
 * 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
 * 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
 * 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
 * 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
 * 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
 * 因此，3 可为起始索引。
 *
 * 示例 2:
 *
 *
 * 输入: gas = [2,3,4], cost = [3,4,3]
 * 输出: -1
 * 解释:
 * 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
 * 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
 * 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
 * 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
 * 因此，无论怎样，你都不可能绕环路行驶一周。
 *
 *
 *
 * 提示:
 *
 *
 * gas.length == n
 * cost.length == n
 * 1 <= n <= 10^5
 * 0 <= gas[i], cost[i] <= 10^4
 *
 *
 */

// @lc code=start
// 暴力 - 超时
// 时间: O(n^2)
// 空间: O(1)
function canCompleteCircuit1(gas: number[], cost: number[]): number {
  const len = gas.length;

  // 判断以每个加油站为起点，能否环绕一周
  for (let i = 0; i < len; i++) {
    if (gas[i] <= 0 || gas[i] < cost[i]) {
      // 如果当前起点不足以到达下一个加油站，那么这个起点就不用判断，判断下一个
      continue;
    }
    let left = 0;
    for (let j = 0; j < len; j++) {
      // 因为最后一个加油站的下一个加油站是0，所以这样计算
      const k = (i + j) % len;
      left += gas[k] - cost[k];
      if (left < 0) {
        // 以i为起点走到k加油站时，不足以到达下一个加油站
        // 表示i为起点不能环绕一周
        break;
      }
    }
    // 如果left>=0，表示以i为起点是可以环绕一周的
    if (left >= 0) {
      return i;
    }
  }

  // 所有起点都判断了，没有能环绕一周的
  return -1;
}

// 贪心 - 一次遍历
// 时间: O(n)
// 空间: O(1)
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const len = gas.length;

  for (let i = 0; i < len; ) {
    let j = 0; // i位起点可以达到的第几个加油站
    let gasSum = 0,
      costSum = 0;

    for (let k = 0; k < len; k++) {
      const cur = (i + k) % len;
      gasSum += gas[cur];
      costSum += cost[cur];
      if (gasSum < costSum) {
        // 无法到达下一个加油站了
        break;
      }
      j++;
    }

    if (j === len) {
      // 说明i为起点可以环绕一周
      return i;
    }
    // i到i+j之间的加油站无需再判断了，直接从i+j+1开始
    i += j + 1;
  }

  // 所有起点都判断了，没有能环绕一周的
  return -1;
}
// @lc code=end
