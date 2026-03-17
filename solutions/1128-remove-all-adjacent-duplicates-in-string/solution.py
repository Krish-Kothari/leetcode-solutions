class Solution:
    def removeDuplicates(self, s: str) -> str:
        ans=""
        stack=[]
        for i in s:
            if len(stack)!=0 and stack[-1]==i:
                stack.pop()
            else:
                stack.append(i)
        for i in stack:
            ans+=i
        return ans
