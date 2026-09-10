class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans=[]
        def f(curr,open,close):
            if len(curr)==2*n:
                ans.append(''.join(curr))
                return
            if open<n:
                curr.append('(')
                f(curr,open+1,close)
                curr.pop()
            if close<open:
                curr.append(')')
                f(curr,open,close+1)
                curr.pop()
        f([],0,0)
        return ans
