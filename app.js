// 242 https://leetcode.com/problems/valid-anagram/description/


//Input: s = "anagram", t = "nagaram"
//Output: true


function isAnagram(s, t) {
    if (s.length !== t.length) {
      return false;
    }
  
    const count = Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
      count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }
  
    for (let i = 0; i < 26; i++) {
      if (count[i] !== 0) {
        return false;
      }
    }
    return true;
  }
  
  
  //243 https://leetcode.com/problems/shortest-word-distance/
  
  
  //Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
  //Output: 3
  
  
  class Solution {
    shortestDistance(words, word1, word2) {
      let minDistance = words.length;
      for (let i = 0; i < words.length; i++) {
        if (words[i] === word1) {
          for (let j = 0; j < words.length; j++) {
            if (words[j] === words2) {
              minDistance = Math.min(minDistance, Math.abs(i - j));
            }
          }
        }
      }
      return minDistance;
    }
  }
  
  
  //244 https://leetcode.com/problems/shortest-word-distance-ii/
  
  
  // Input
  //["WordDistance", "shortest", "shortest"]
  //[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], //["makes", "coding"]]
  //Output
  [null, 3, 1]
  //Explanation
  //WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
  wordDistance.shortest("coding", "practice"); // return 3
  wordDistance.shortest("makes", "coding");    // return 1
  
  
  
  class WordDistance {
    constructor(words) {
      this.locations = new Map();
      words.forEach((word, i) => {
        if (!this.locations.has(word)) {
          this.locations.set(word, []);
        }
        this.locations.get(word).push(i);
      });
    }
  
    shortest(word1, word2) {
      const loc1 = this.locations.get(word1);
      const loc2 = this.locations.get(word2);
      let l1 = 0, l2 = 0, minDiff = Infinity;
  
      while (l1 < loc1.length && l2 < loc2.length) {
        minDiff = Math.min(minDiff, Math.abs(loc1[l1] - loc2[l2]));
  
        if (loc1[l1] < loc2[l2]) {
          l1++;
        } else {
          l2++;
        }
      }
      return minDiff
    }
  }
  
  
  // 245 https://leetcode.com/problems/shortest-word-distance-ii/
  
  
  //Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
  //Output: 1
  
  class Solution {
    shortestWordDistance(wordsDict, word1, word2) {
      const indices1 = [];
      const indices2 = [];
      wordsDict.forEach((word, i) => {
        if (word === word1) {
          indices1.push(i);
        }
        if (word === word2) {
          indices2.push(i);
        }
      });
  
      let shortestDistance = Infinity;
      indices1.forEach(index => {
        const x = indices2.findIndex(i => i > index);
        if (x !== -1) {
          shortestDistance = Math.min(shortestDistance, indices2[x] - index);
        }
        if (x > 0 && indices2[x - 1] !== index) {
          shortestDistance = Math.min(shortestDistance, index - indices2[x - 1]);
        }
      });
      return shortestDistance;
    }
  }
  




//246 https://leetcode.com/problems/strobogrammatic-number/


// Input: num = "69"
//Output: true


class Solution {
  isStrobogrammatic(num) {
    let rotated = "";
    for (let i = num.length - 1; i >= 0; i--) {
      const c = num[i];
      if (c === '0' || c === '1' || c === '8') {
        rotated += c;
      } else if (c === '6') {
        rotated += '9';
      } else if (c === '9') {
        rotated += '6';
      } else {
        return false;
      }
    }
    return num === rotated;
  }
}


//266 https://leetcode.com/problems/palindrome-permutation/description/


//Input: s = "code"
//Output: false



class Solution {
  canPermutePalindrome(s) {
    const map = new Array(128).fill(0);
    let count = 0;
    for (const char of s) {
      const index = char.charCodeAt(0);
      map[index]++;
      if (map[index] % 2 === 0) {
        count--;
      } else {
        count++;
      }
    }
    return count <= 1;
  }
}


//247 https://leetcode.com/problems/strobogrammatic-number-ii/

//Input: n = 2
//Output: ["11","69","88","96"]

class Solution {
  constructor() {
    this.reversiblePairs = [
      ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6']
    ];
  }

  generateStroboNumbers(n, finalLength) {
    if (n === 0) {
      return [""];
    }

    if (n === 1) {
      return ["0", "1", "8"];
    }

    const prevStroboNums = this.generateStroboNumbers(n - 2, finalLength);
    const currStroboNums = [];

    for (const prevStroboNum of prevStroboNums) {
      for (const pair of this.reversiblePairs) {
        if (pair[0] !== '0' || n !== finalLength) {
          currStroboNums.push(pair[0] + prevStroboNum + pair[1]);
        }
      }
    }
    return currStroboNums;
  }

  findStrobogrammatic(n) {
    return this.generateStroboNumbers(n, n);
  }
}


// 249 https://leetcode.com/problems/group-shifted-strings/

// Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]

//Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

class Solution {
  shiftLetter(letter, shift) {
    return String.fromCharCode((letter.charCodeAt(0) - shift + 26) % 26 + 'a'.charCodeAt(0));
  }

  getHash(s) {
    const shift = s.charCodeAt(0);
    return Array.from(s, letter => this.shiftLetter(letter, shift)).join('');
  }

  groupStrings(strings) {
    const mapHashToList = new Map();

    for (const str of strings) {
      const hashKey = this.getHash(str);
      if (!mapHashToList.has(hashKey)) {
        mapHashToList.set(hashKey, []);
      }
      mapHashToList.get(hashKey).push(str);
    }
    return Array.from(mapHashToList.values());
  }
}


//267 https://leetcode.com/problems/palindrome-permutation-ii/description/

// Input: s = "aabb"
//Output: ["abba","baab"]


class Solution {
  constructor() {
    this.set = new Set();
  }

  generatePalindromes(s) {
    const map = new Array(128).fill(0);
    const st = new Array(Math.floor(s.length / 2)).fill('');
    if (!this.canPermutePalindrome(s, map)) {
      return [];
    }

    let ch = '';
    let k = 0;
    for (let i = 0; i < map.length; i++) {
      if (map[i] % 2 === 1) {
        ch = String.fromCharCode(i)
      }

      for (let j = 0; j < Math.floor(map[i] / 2); j++) {
        st[k++] = String.fromCharCode(i);
      }
    }
    this.permute(st, 0, ch);
    return Array.from(this.set);
  }

  canPermutePalindrome(s, map) {
    let count = 0;
    for (const char of s) {
      const index = char.charCodeAt(0);
      map[index]++;
      if (map[index] % 2 === 0) {
        count--;
      } else {
        count++;
      }
    }
    return count <= 1;
  }

  swap(s, i, j) {
    [s[i], s[j]] = [s[j], s[i]];
  }

  permute(s, l, ch) {
    if (l === s.length) {
      this.set.add(s.join('') + (ch === '' ? '' : ch) + s.slice().reverse().join(''));
    } else {
      for (let i = l; i < s.length; i++) {
        if (s[l] !== s[i] || l === i) {
          this.swap(s, l, i);
          this.permute(s, l + 1, ch);
          this.swap(s, l, i);
        }
      }
    }
  }
}


//250 https://leetcode.com/problems/count-univalue-subtrees/


// Input: root = [5,1,5,5,5,null,5]
//Output: 4


class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  constructor() {
    this.count = 0;
  }

  dfs(node) {
    if (node === null) {
      return true;
    }

    const isLeftUniValue = this.dfs(node.left);
    const isRightUniValue = this.dfs(node.right);

    if (isLeftUniValue && isRightUniValue) {
      if (node.left !== null && node.left.val !== node.val) {
        return false;
      }
      this.count++;
      return true;
    }
    return false;
  }

  countUnivalSubtrees(root) {
    this.dfs(root);
    return this.count;
  }
}

//251 https://leetcode.com/problems/flatten-2d-vector/

//Input
["Vector2D", "next", "next", "next", "hasNext", "hasNext", "next", "hasNext"]
[[[[1, 2], [3], [4]]], [], [], [], [], [], [], []]
Output
[null, 1, 2, 3, true, true, 4, false]

Explanation
//Vector2D vector2D = new Vector2D([[1, 2], [3], [4]]);
vector2D.next();    // return 1
vector2D.next();    // return 2
vector2D.next();    // return 3
vector2D.hasNext(); // return True
vector2D.hasNext(); // return True
vector2D.next();    // return 4
vector2D.hasNext(); // return False


class Vector2D {
  constructor(v) {
    this.nums = [].concat(...v);
    this.position = -1;
  }

  next() {
    this.position++;
    return this.nums[this.position];
  }

  hasNext() {
    return this.position + 1 < this.nums.length;
  }
}



//268 https://leetcode.com/problems/missing-number/


// Input: nums = [3,0,1]
//Output: 2
//Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

const missingNumber = function(nums) {
  nums.sort((a, b) => a - b)
  if (nums[nums.length - 1] != nums.length) {
    return nums.length
  } else if (nums[0] != 0) {
    return 0
  }

  for (let i = 1; i < nums.length; i++) {
    let expectedNum = nums[i - 1] + 1
    if (nums[i] != expectedNum) {
      return expectedNum
    }
  }
  return -1
}


//269 https://leetcode.com/problems/alien-dictionary/


//Input: words = ["wrt","wrf","er","ett","rftt"]
//Output: "wertf"


const alienOrder = function(words) {
  const adjList = new Map();
  const inDegree = new Map();


  for (const word of words) {
    for (const char of word) {
      inDegree.set(char, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const firstWord = words[i];
    const secondWord = words[i + 1];
    for ( let j = 0; j < Math.min(firstWord.length, secondWord.length); j++) {
      const c = firstWord[j];
      const d = secondWord[j];

      if (c !== d) {
        if (!adjList.has(c)) {
          adjList.set(c, new Set());
        }
        if (!adjList.get(c).has(d)) {
          adjList.get(c).add(d);
          inDegree.set(d, inDegree.get(d) + 1);
        }
        break;
      }
    }

    if (secondWord.length < firstWord.lengh && firstWord.startsWith(secondWord)) {
      return "";
    }
  }

  const output = [];
  const queue = [];

  for (const [char, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(char);
    }
  }

  while (queue.length > 0) {
    const c = queue.shift();
    output.push(c);
    if (adjList.has(c)) {
      for (const d of adjList.get(c)) {
        inDegree.set(d, inDegree.get(d) - 1);
        if (inDegree.get(d) === 0) {
          queue.push(d);
        }
      }
    }
  }

  if (output.length < inDegree.size) {
    return "";
  }

  return output.join("");
};



// https://leetcode.com/problems/closest-binary-search-tree-value/description/


// Input: root = [4,2,5,1,3], target = 3.714286
//Output: 4

const closestValue = function(root, target) {
  let closest = root.val;
  while (root) {
    if (Math.abs(root.val - target) < Math.abs(closest - target)) {
      closest = root.val;
    } else if (Math.abs(root.val - target) === Math.abs(closest - target)) {
      closest = Math.min(root.val, closest);
    }
    root = target < root.val ? root.left : root.right;
  }
  return closest;
};

//213 https://leetcode.com/problems/house-robber-ii/description/

//Input: nums = [1,2,3,1]
//Output: 4
//Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
//Total amount you can rob = 1 + 3 = 4.


class Solution {
  rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let max1 = this.robSimple(nums, 0, nums.length - 2);
    let max2 = this.robSimple(nums, 1, nums.length -1);

    return Math.max(max1, max2);
  }

  robSimple(nums, start, end) {
    let t1 = 0;
    let t2 = 0;

    for (let i = start; i <= end; i++) {
      let temp = t1;
      let current = nums[i];
      t1 = Math.max(current + t2, t1);
      t2 = temp;
    }
    return t1;
  }
}


//272 https://leetcode.com/problems/encode-and-decode-strings/description/


//Input: root = [4,2,5,1,3], target = 3.714286, k = 2
//Output: [4,3]


const closestKValues = function(root, target, k) {
  const arr = [];
  dfs(root, arr);
  arr.sort((o1, o2) => Math.abs(o1 - target) - Math.abs(o2 - target));
  return arr.slice(0, k);
};

function dfs(node, arr) {
  if (!node) return;
  arr.push(node.val);
  dfs(node.left, arr);
  dfs(node.right, arr);
}

// 214  https://leetcode.com/problems/shortest-palindrome/description/


// Input: s = "aacecaaa"
//Output: "aaacecaaa"

class Solution {
  shortestPalindrome(s) {
    const n = s.length;
    const rev = s.split('').reverse().join('');
    for (let i = 0; i < n; i++) {
      if (s.substring(0, n - i) === rev.substring(i)) {
        return rev.substring(0, i) + s;
      }
    }
    return "";
  }
}


//273 https://leetcode.com/problems/integer-to-english-words/

//Input: num = 123
//Output: "One Hundred Twenty Three"


const numberToWords = function(num) {
  if (num === 0) return "Zero";

  const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million", "Billion"];

  let result = "";
  let i = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      result = helper(num % 1000) + thousands[i] + " " + result;
    }
    num = Math.floor(num / 1000);
    i++;
  }
  return result.trim();
};

function helper(num) {
  const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) return "";
  else if (num < 20) return belowTwenty[num] + " ";
  else if (num < 100) return tens[Math.floor(num / 10)] + " " + helper(num % 10);
  else return belowTwenty[Math.floor(num / 100)] + "  Hundred " + helper(num % 100);
}

//215 https://leetcode.com/problems/kth-largest-element-in-an-array/description/

//Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
//Output: 4

class Solution {
  shortestPalindrome(s) {
    const n = s.length;
    const rev = s.split('').reverse().join('');
    for (let i = 0; i < n; i++) {
      if (s.substring(0, n - i) === rev.substring(i)) {
        return rev.substring(0, i) + s;
      }
    }
    return "";
  }
}

//274 https://leetcode.com/problems/h-index/

//Input: citations = [3,0,6,1,5]
//Output: 3
//Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
//Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.


const hIndex = function(citations) {
  let n = citations.length;
  let papers = new Array(n + 1).fill(0);

  for (let c of citations) {
    papers[Math.min(n, c)]++;
  }

  let k = n;
  for (let s = papers[n]; k > s; s += papers[k]) {
    k--;
  }
  return k;
};

//216 https://leetcode.com/problems/combination-sum-iii/description/

//Input: k = 3, n = 9
//Output: [[1,2,6],[1,3,5],[2,3,4]]
//Explanation:
//1 + 2 + 6 = 9
//1 + 3 + 5 = 9
//2 + 3 + 4 = 9

//There are no other valid combinations.


const combinationSum3 = function(k, n) {
  const results = [];
  const comb = [];

  const backtrack = (remain, k, comb, nextStart) => {
    if (remain === 0 && comb.length === k) {
      results.push([...comb]);
      return;
    } else if (remain < 0 || comb.length === k) {
      return;
    }

    for (let i = nextStart; i < 9; i++) {
      comb.push(i + 1);
      backtrack(remain - i - 1, k, comb, i + 1);
      comb.pop();
    }
  };

  backtrack(n, k, comb, 0);
  return results;
};


// 275 https://leetcode.com/problems/h-index-ii/

//Input: citations = [0,1,3,5,6]
//Output: 3
//Explanation: [0,1,3,5,6] means the researcher has 5 papers in total and each of them had received 0, 1, 3, 5, 6 citations respectively.
//Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.




const HIndex = function(citations) {
  let n = citations.length;
  let left = 0, right = n - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (citations[mid] === n - mid) {
      return n - mid;
    } else if (citations[mid] < n - mid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return n - left;
};


217 // https://leetcode.com/problems/contains-duplicate/description/

Input: nums = [1,2,3,4]
Output: false


function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
  }
  return false;
}


218 // https://leetcode.com/problems/the-skyline-problem/description/

//Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
//Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
//Explanation:
//Figure A shows the buildings of the input.
//Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.


class Solution {
  getSkyline(buildings) {
    const edgeSet = new Set();
    for (const building of buildings) {
      const [left, right] = building;
      edgeSet.add(left);
      edgeSet.add(right);
    }
    const edges = Array.from(edgeSet).sort((a, b) => a - b);

    const edgeIndexMap = new Map();
    edges.forEach((edge, i) => edgeIndexMap.set(edge, i));

    const heights = new Array(edges.length).fill(0);

    for (const building of buildings) {
      const [left, right, height] = building;
      const leftIndex = edgeIndexMap.get(left);
      const rightIndex = edgeIndexMap.get(right);

      for (let idx = leftIndex; idx < rightIndex; ++idx) {
        heights[idx] = Math.max(heights[idx], height);
      }
    }

    const answer = [];

    for (let i = 0; i < heights.length; ++i) {
      const currHeight = heights[i], currPos = edges[i];

      if (answer.length === 0 || answer[answer.length - 1][1] !== currHeight) {
        answer.push([currPos, currHeight]);
      }
    }
    return answer;
  }
}


276. //https://leetcode.com/problems/paint-fence/

// Input: n = 3, k = 2
//Output: 6
//Explanation: All the possibilities are shown.
//Note that painting all the posts red or all the posts green is invalid because there cannot be three posts in a row with the same color.


const numWays = function(n, k) {
  if (n === 1) {
    return k;
  }

  let twoPostsBack = k;
  let onePostBack = k * k;

  for (let i = 3; i <= n; i++) {
    let curr = (k - 1) * (onePostBack + twoPostsBack);
    twoPostsBack = onePostBack;
    onePostBack = curr;
  }

  return onePostBack;
};

219. //https://leetcode.com/problems/contains-duplicate-ii/

//Input: nums = [1,2,3,1,2,3], k = 2
//Output: false

const containsNearbyDuplicate = function(nums, k) {
  let set = new Set();
  for (let i = 0; i < nums.length; ++i) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) set.delete(nums[i - k]);
  }
  return false;
};


314. // https://leetcode.com/problems/binary-tree-vertical-order-traversal/description/


//Input: root = [3,9,20,null,null,15,7]
//Output: [[9],[3,15],[20],[7]]


class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Solution {
  verticalOrder(root) {
    const output = [];
    if (root === null) {
      return output;
    }

    const columnTable = new Map();
    const queue = [];
    let column = 0;
    queue.push([root, column]);

    while (queue.length > 0) {
      const [node, col] = queue.shift();

      if (node !== null) {
        if (!columnTable.has(col)) {
          columnTable.set(col, []);
        }

        columnTable.get(col).push(node.val);

        queue.push([node.left, col - 1]);
        queue.push([node.right, col + 1]);
      }
    }

    const sortedKeys = Array.from(columnTable.keys()).sort((a, b) => a - b);
    for (const key of sortedKeys) {
      output.push(columnTable.get(key));
    }

    return output;
  }
}


315. //https://leetcode.com/problems/count-of-smaller-numbers-after-self/editorial/


//Input: nums = [5,2,6,1]
//Output: [2,1,1,0]
//Explanation:
//To the right of 5 there are 2 smaller elements (2 and 1).
//To the right of 2 there is only 1 smaller element (1).
//To the right of 6 there is 1 smaller element (1).
//To the right of 1 there is 0 smaller element.


class Solution {
  countSmaller(nums) {
    const offset = 10000;
    const size = 2 * 10000 + 1;
    const tree = new Array(size * 2).fill(0);
    const result = [];

    for (let i = nums.length - 1; i >= 0; i--) {
      const smallerCount = this.query(0, nums[i] + offset, tree, size);

      result.push(smallerCount);
      this.update(nums[i] + offset, 1, tree, size);
    }
    return result.reverse();
  }

  update(index, value, tree, size) {
    index += size;
    tree[index] += value;
    while (index > 1) {
      index = Math.floor(index / 2);
      tree[index] = tree[index * 2] + tree[index * 2 + 1];
    }
  }

  query(left, right, tree, size) {
    let result = 0;
    left += size;
    right += size;
    while (left < right) {
      if (left % 2 === 1) {
        result += tree[left];
        left++;
      }

      left = Math.floor(left / 2);
      if (right % 2 === 1) {
        right--;
        result += tree[right];
      }
      right = Math.floor(right / 2);
    }
    return result;
  }
}


220. // https://leetcode.com/problems/contains-duplicate-iii/description/

//  Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
//Output: true
//Explanation: We can choose (i, j) = (0, 3).
//We satisfy the three conditions:
i != j --> 0 != 3
abs(i - j) <= indexDiff --> abs(0 - 3) <= 3
abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0


function getID(x, w) {
  return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
}

const containsNearbyAlmostDuplicate = function(nums, k, t) {
  if (t < 0) return false;
  const buckets = new Map();
  const w = t + 1;

  for (let i = 0; i < nums.length; i++) {
    const bucket = getID(nums[i], w);
    if (buckets.has(bucket)) return true;
    if (buckets.has(bucket - 1) && Math.abs(nums[i] - buckets.get(bucket - 1)) < w) return true;

    if (buckets.has(bucket + 1) && Math.abs(nums[i] - buckets.get(bucket + 1)) < w) return true;

    buckets.set(bucket, nums[i]);
    if (i >= k) {
      buckets.delete(getID(nums[i - k], w));
    }
  }
  return false;
};


221. //https://leetcode.com/problems/maximal-square/description/

//  Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
//Output: 4


const maximalSquare = function(matrix) {
  let rows = matrix.length, cols = rows > 0 ? matrix[0].length : 0;

  let dp = new Array(cols + 1).fill(0);
  let maxsqlen = 0, prev = 0;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      let temp = dp[j];
      if (matrix[i - 1][j - 1] == '1') {
        dp[j] = Math.min(dp[j - 1], Math.min(prev, dp[j])) + 1;

        maxsqlen = Math.max(maxsqlen, dp[j]);
      } else {
        dp[j] = 0;
      }
      prev = temp;
    }
  }
  return maxsqlen * maxsqlen;
};

222. // Count Complete Tree Nodes

//Input: root = [1,2,3,4,5,6]
//Output: 6



class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}


function computeDepth(node) {
  let d = 0;

  while ( node.left !== null) {
    node = node.left;
    ++d;
  }
  return d;
}

function exists(idx, d, node) {
  let left = 0, right = Math.pow(2, d) - 1;

  for (let i = 0; i < d; ++i) {
    let pivot = left + Math.floor((right - left) / 2);

    if (idx <= pivot) {
      node = node.left;
      right = pivot;
    
    } else {
      node = node.right;
      left = pivot + 1;
    }
  }

  return node !== null;
}

function countNodes(root) {
  if (root === null) return 0;

  let d = computeDepth(root);

  if (d === 0) return 1;

  let left = 1, right = Math.pow(2, d) - 1;

  while (left <= right) {
    let pivot = left + Math.floor((right - left) / 2);

    if (exists(pivot, d, root)) left = pivot + 1;
    else right = pivot - 1;
  }

  return Math.pow(2, d) - 1 + left;
}


227. // https://leetcode.com/problems/find-the-celebrity/description/

//Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
//Output: 1
//Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.


const Solution = function() {
  this.n = 0;
  this.cache = new Map();
};

Solution.prototype.findCelebrity = function(n) {
  this.n = n;
  let celebrityCandidate = 0;

  for (let i = 1; i < n; i++) {
    if (this.cachedKnows(celebrityCandidate, i)) {
      celebrityCandidate = i;
    }
  }

  return this.isCelebrity(celebrityCandidate) ? celebrityCandidate : -1;
};

Solution.prototype.isCelebrity = function(i) {

  for (let j = 0; j < this.n; j++) {
    if (i === j) continue;
    if (this.cachedKnows(i, j) || !this.cachedKnows(j, i)) {
      return false;
    }
  }
  return true;
};

Solution.prototype.cachedKnows = function(a, b) {
  const key = `${a},${b}`;
  if (!this.cache.has(key)) {
    this.cache.set(key, knows(a, b));
  }
  return this.cache.get(key);
};


223.  //https://leetcode.com/problems/rectangle-area/description/

//Input: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
//Output: 45


function computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const areaOfA = (ay2 - ay1) * (ax2 - ax1);
  const areaOfB = (by2 - by1) * (bx2 - bx1);
  
  const left = Math.max(ax1, bx1);
  const right = Math.min(ax2, bx2);
  const xOverlap = right - left;

  const top = Math.min(ay2, by2);
  const bottom = Math.max(ay1, by1);
  const yOverlap = top - bottom;

  let areaOfOverlap = 0;
  if (xOverlap > 0 && yOverlap > 0) {
    areaOfOverlap = xOverlap * yOverlap;
  }

  const totalArea = areaOfA + areaOfB - areaOfOverlap;

  return totalArea;

};


224. // https://leetcode.com/problems/basic-calculator/

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23


class Solution {
  evaluateExpr(stack) {
    if (stack.length === 0 || typeof stack[stack.length - 1] !== 'number') {
      stack.push(0);
    }

    let res = stack.pop();

    while (stack.length !== 0 && stack[stack.length - 1] !== ')') {
      let sign = stack.pop();

      if (sign === '+') {
        res += stack.pop();
      } else {
        res -= stack.pop();
      }
    }
    return res;
  }

  calculate(s) {
    let operand = 0;
    let n = 0;
    let stack = [];

    for (let i = s.length - 1; i >= 0; i--) {
      let ch = s[i];

      if (/\d/.test(ch)) {
        operand = Math.pow(10, n) * (parseInt(ch)) + operand;

        n += 1;
      } else if (ch !== ' ') {
        if (n !== 0) {
          stack.push(operand);
          n = 0;
          operand = 0;
        }

        if (ch === '(') {
          let res = this.evaluateExpr(stack);
          stack.pop();
          stack.push(res);
        } else {
          stack.push(ch);
        }
      }
    }

    if (n !== 0) {
      stack.push(operand);
    }

    return this.evaluateExpr(stack);
  }
}