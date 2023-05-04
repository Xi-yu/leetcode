/*
 * @lc app=leetcode.cn id=179 lang=typescript
 *
 * [179] 最大数
 *
 * https://leetcode.cn/problems/largest-number/description/
 *
 * algorithms
 * Medium (41.15%)
 * Likes:    1122
 * Dislikes: 0
 * Total Accepted:    196.4K
 * Total Submissions: 477.6K
 * Testcase Example:  '[10,2]'
 *
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
 *
 * 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,2]
 * 输出："210"
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,30,34,5,9]
 * 输出："9534330"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
// 自定义排序
// 时间: O(nlogn)
// 空间: O(logn)
function largestNumber(nums: number[]): string {
  nums.sort((a, b) => {
    if (`${a}${b}` > `${b}${a}`) {
      // 如果a放在前面比放在后面大
      // 顺序不变
      return -1;
    } else {
      // 交换a、b顺序
      return 1;
    }
  });
  let ans: string = "";
  // 遍历数组拼接结果
  for (let i = 0; i < nums.length; i++) {
    // 如果ans为字符串'0', 不用再继续拼接了, 可以退出遍历了
    if (ans === "0") {
      break;
    }
    ans += `${nums[i]}`;
  }
  return ans;
}
// @lc code=end
