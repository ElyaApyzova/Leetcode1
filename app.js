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
