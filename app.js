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

