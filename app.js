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


