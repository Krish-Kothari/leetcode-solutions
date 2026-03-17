class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        ans1=''
        ans2=''
        stack1=[]
        stack2=[]
        for i in s:
            if i=='#':
                if len(stack1)!=0:
                    stack1.pop()
            else:
                stack1.append(i)
        for i in stack1:
            ans1+=i
        for i in t:
            if i=='#':
                if len(stack2)!=0:
                    stack2.pop()
            else:
                stack2.append(i)
        for i in stack2:
            ans2+=i
        return ans1==ans2
