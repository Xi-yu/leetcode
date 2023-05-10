/*
 * @lc app=leetcode.cn id=468 lang=typescript
 *
 * [468] 验证IP地址
 *
 * https://leetcode.cn/problems/validate-ip-address/description/
 *
 * algorithms
 * Medium (28.16%)
 * Likes:    233
 * Dislikes: 0
 * Total Accepted:    62.5K
 * Total Submissions: 221.9K
 * Testcase Example:  '"172.16.254.1"'
 *
 * 给定一个字符串 queryIP。如果是有效的 IPv4 地址，返回 "IPv4" ；如果是有效的 IPv6 地址，返回 "IPv6"
 * ；如果不是上述类型的 IP 地址，返回 "Neither" 。
 *
 * 有效的IPv4地址 是 “x1.x2.x3.x4” 形式的IP地址。 其中 0 <= xi <= 255 且 xi 不能包含 前导零。例如:
 * “192.168.1.1” 、 “192.168.1.0” 为有效IPv4地址， “192.168.01.1” 为无效IPv4地址;
 * “192.168.1.00” 、 “192.168@1.1” 为无效IPv4地址。
 *
 * 一个有效的IPv6地址 是一个格式为“x1:x2:x3:x4:x5:x6:x7:x8” 的IP地址，其中:
 *
 *
 * 1 <= xi.length <= 4
 * xi 是一个 十六进制字符串 ，可以包含数字、小写英文字母( 'a' 到 'f' )和大写英文字母( 'A' 到 'F' )。
 * 在 xi 中允许前导零。
 *
 *
 * 例如 "2001:0db8:85a3:0000:0000:8a2e:0370:7334" 和
 * "2001:db8:85a3:0:0:8A2E:0370:7334" 是有效的 IPv6 地址，而
 * "2001:0db8:85a3::8A2E:037j:7334" 和
 * "02001:0db8:85a3:0000:0000:8a2e:0370:7334" 是无效的 IPv6 地址。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：queryIP = "172.16.254.1"
 * 输出："IPv4"
 * 解释：有效的 IPv4 地址，返回 "IPv4"
 *
 *
 * 示例 2：
 *
 *
 * 输入：queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
 * 输出："IPv6"
 * 解释：有效的 IPv6 地址，返回 "IPv6"
 *
 *
 * 示例 3：
 *
 *
 * 输入：queryIP = "256.256.256.256"
 * 输出："Neither"
 * 解释：既不是 IPv4 地址，又不是 IPv6 地址
 *
 *
 *
 *
 * 提示：
 *
 *
 * queryIP 仅由英文字母，数字，字符 '.' 和 ':' 组成。
 *
 *
 */

// @lc code=start
// 模拟判断
// 时间: O(n)
// 空间: O(1)
function validIPAddress(queryIP: string): string {
  const IPv4: string = "IPv4";
  const IPv6: string = "IPv6";
  const Neither: string = "Neither";
  const IPv4Arr = queryIP.split(".");
  if (IPv4Arr.length === 4) {
    for (const x of IPv4Arr) {
      if (!validIpv4(x)) {
        return Neither;
      }
    }
    return IPv4;
  } else {
    const IPv6Arr = queryIP.split(":");
    if (IPv6Arr.length === 8) {
      for (const x of IPv6Arr) {
        if (!validIpv6(x)) {
          return Neither;
        }
      }
      return IPv6;
    }
  }
  return Neither;
}

function validIpv4(x: string): boolean {
  const length = x.length;
  if (length < 1 || length > 3) {
    return false;
  }
  if (length > 1 && x[0] === "0") {
    // 有前导0, 不是有效的
    return false;
  }
  let num: number = 0;
  for (const c of x) {
    const n = c.charCodeAt(0) - "0".charCodeAt(0);
    if (n >= 0 && n <= 9) {
      num = num * 10 + n;
    } else {
      // 有一个字符不是0到9, 就不是有效的
      return false;
    }
  }
  return num >= 0 && num <= 255;
}

function validIpv6(x: string): boolean {
  const length = x.length;
  if (length < 1 || length > 4) {
    return false;
  }
  for (const c of x) {
    const reg = /[0-9a-fA-F]/;
    if (!reg.test(c)) {
      return false;
    }
  }
  return true;
}
// @lc code=end
