/*
 * @lc app=leetcode.cn id=207 lang=typescript
 *
 * [207] 课程表
 *
 * https://leetcode.cn/problems/course-schedule/description/
 *
 * algorithms
 * Medium (53.61%)
 * Likes:    1600
 * Dislikes: 0
 * Total Accepted:    298.7K
 * Total Submissions: 557.5K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
 *
 * 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi]
 * ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
 *
 *
 * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
 *
 *
 * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：true
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
 *
 * 示例 2：
 *
 *
 * 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
 * 输出：false
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * prerequisites[i].length == 2
 * 0 i, bi < numCourses
 * prerequisites[i] 中的所有课程对 互不相同
 *
 *
 */

// @lc code=start
// 拓扑排序（bfs）
// 时间: O(m+n)
// 空间: O(m+n)
// m: 课程数量；n: prerequisites.length
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // key是课程b，value是先修课程包含课程b的所有课程
  const hash: Map<number, number[]> = new Map();
  // 保存每个课程（0到numCourses-1）的入度（有几个先修课程）
  const indeg: number[] = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    // 课程a的先修课程是课程b，所以key是b
    if (hash.has(b)) {
      hash.get(b)?.push(a);
    } else {
      hash.set(b, [a]);
    }
    // a课程的入度加一
    indeg[a]++;
  }

  // 当前可以学习的课程: 先修课程都已经学习或者没有先修课程（即入度为0）
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) {
      // 如果i课程的入度为0，表示i课程也可以学习了，push到队列中等待学习
      queue.push(i);
    }
  }

  // 已经学习的课程数量
  let ans = 0;

  // 不断轮询学习队列中的第一个课程
  while (queue.length) {
    // b课程可以学习了，所有先修课程包含b课程的入度都减一
    const b: number = queue.shift() as number;
    // 已学课程加1
    ans++;
    // 更新先修课程包含b的入度，并且将更新后入度为0的课程push到队列
    if (hash.has(b)) {
      // hash.get(b)：先修课程中包含b课程的所有课程
      for (const a of hash.get(b) as number[]) {
        // indeg[a]：a课程的入度
        // 因为b课程已经学了，所以a课程的入度减一
        indeg[a]--;
        if (indeg[a] === 0) {
          // 如果a课程的入度为0，表示a课程也可以学习了，push到队列中等待学习
          queue.push(a);
        }
      }
    }
  }

  return ans === numCourses;
}
// @lc code=end
