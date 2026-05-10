class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        c1=''
        c2=''
        for i in word1:
            c1+=i
        for i in word2:
            c2+=i
        return c1==c2
