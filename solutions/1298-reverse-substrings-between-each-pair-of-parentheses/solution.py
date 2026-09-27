class Solution:
    def reverseParentheses(self, s: str) -> str:
        ans=[]
        x=[]
        for i in s:
            if i=="(":
                x.append(len(ans))
            elif i==")":
                lo=x.pop()
                hi=len(ans)-1
                while lo<hi:
                    ans[lo],ans[hi]=ans[hi],ans[lo]
                    lo+=1
                    hi-=1
            else:
                ans.append(i)
        return "".join(ans)
