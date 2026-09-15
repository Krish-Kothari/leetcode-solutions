class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        ans=[]
        b=0
        x=0
        for i,ch in enumerate(s):
            if ch=='(':
                b+=1
            else:
                b-=1
            if b==0:
                ans.append(s[x+1:i])
                x=i+1
        return ''.join(ans)

