class Solution:
    def maxDepth(self, s: str) -> int:
        ans=0
        for i in range(len(s)):
            x=0
            for j in range(i+1):
                if s[j]=="(":
                    x+=1
                elif s[j]==")":
                    x-=1
            ans=max(ans,x)
        return ans
