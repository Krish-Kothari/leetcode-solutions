class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        ans=''
        x1=len(word1)
        x2=len(word2)
        x=min(x1,x2)
        for i in range(x):
            ans+=word1[i]
            ans+=word2[i]
        if x<len(word2):
            ans+=word2[x:]
        if x<len(word1):
            ans+=word1[x:]
        return ans
