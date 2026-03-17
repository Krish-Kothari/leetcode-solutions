class Solution:
    def isValid(self, s: str) -> bool:
        a1,a2,a3,a4,a5,a6='(',')','{','}','[',']'
        stack=[]
        for i in s:
            if i==a1 or i==a3 or i==a5:
                stack.append(i)
            else:
                if not stack:
                    return False
                top=stack.pop()
                if i==a2 and top!=a1:
                    return False
                if i==a4 and top!=a3:
                    return False
                if i==a6 and top!=a5:
                    return False
        return len(stack)==0
