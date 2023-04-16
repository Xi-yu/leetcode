/*
 * @lc app=leetcode.cn id=43 lang=typescript
 *
 * [43] 字符串相乘
 *
 * https://leetcode.cn/problems/multiply-strings/description/
 *
 * algorithms
 * Medium (44.51%)
 * Likes:    1189
 * Dislikes: 0
 * Total Accepted:    293.6K
 * Total Submissions: 659.6K
 * Testcase Example:  '"2"\n"3"'
 *
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 *
 * 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: num1 = "2", num2 = "3"
 * 输出: "6"
 *
 * 示例 2:
 *
 *
 * 输入: num1 = "123", num2 = "456"
 * 输出: "56088"
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num1.length, num2.length <= 200
 * num1 和 num2 只能由数字组成。
 * num1 和 num2 都不包含任何前导零，除了数字0本身。
 *
 *
 */

// @lc code=start
// 模拟,先乘后加
// 时间：O(m(m+n+m+n))=O(2m^2+2mn)=O(m^2+mn)
// 空间：O(m+n), 过渡字符串变量的最大长度
function multiply1(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }
  let ans: string = "0";
  const len1: number = num1.length;
  const len2: number = num2.length;
  // num1倒序遍历，将每个数与num2相乘，得到结果，再将结果相加
  for (let i = len1 - 1; i >= 0; i--) {
    let cur: string = "",
      ten: number = 0;
    // 补零
    for (let j = len1 - 1; j > i; j--) {
      cur += "0";
    }
    // 相乘
    const x = num1[i].charCodeAt(0) - "0".charCodeAt(0);
    for (let j = len2 - 1; j >= 0; j--) {
      const y = num2[j].charCodeAt(0) - "0".charCodeAt(0);
      const product = x * y + ten;
      ten = Math.floor(product / 10);
      cur = (product % 10).toString() + cur;
    }
    if (ten > 0) {
      cur = ten.toString() + cur;
    }
    // 相加
    ans = sum(ans, cur);
  }
  return ans;
}
function sum(s1: string, s2: string): string {
  let i: number = s1.length - 1,
    j: number = s2.length - 1;
  let ans: string = "";
  let ten: number = 0;
  while (i >= 0 || j >= 0) {
    const x = i >= 0 ? s1[i].charCodeAt(0) - "0".charCodeAt(0) : 0;
    const y = j >= 0 ? s2[j].charCodeAt(0) - "0".charCodeAt(0) : 0;
    const sum = x + y + ten;
    ten = Math.floor(sum / 10);
    ans = (sum % 10).toString() + ans;
    i--;
    j--;
  }
  return ten > 0 ? ten.toString() + ans : ans;
}

// 模拟,先乘后加,用数组表示字符串,优化加法操作的时间复杂度
// 时间: O(mn+2(m+n))=O(mn+2m+2n)=O(mn)
// 空间: O(m+n)
function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }
  const len1: number = num1.length;
  const len2: number = num2.length;
  // len1长度的数字和len2长度的数字，相乘后，长度不会超过len1+len2
  const anss: number[] = new Array(len1 + len2).fill(0);
  for (let i = len1 - 1; i >= 0; i--) {
    const x: number = num1[i].charCodeAt(0) - "0".charCodeAt(0);
    for (let j = len2 - 1; j >= 0; j--) {
      const y: number = num2[j].charCodeAt(0) - "0".charCodeAt(0);
      anss[i + j + 1] += x * y; // 这里的计算结果有超过10的情况，后续还需要处理进位
    }
  }
  // 处理anss超过10的每一项，向前进位
  for (let i = len1 + len2 - 1; i > 0; i--) {
    if (anss[i] >= 10) {
      anss[i - 1] += Math.floor(anss[i] / 10);
      anss[i] = anss[i] % 10;
    }
  }
  // anss第一位可能是0，需要处理，不能直接jion
  let ans: string = "";
  let i = 0;
  if (anss[0] === 0) {
    i = 1; // 从第二位开始一定不是0
  }
  while (i < len1 + len2) {
    ans += anss[i].toString();
    i++;
  }
  return ans;
}
// @lc code=end
