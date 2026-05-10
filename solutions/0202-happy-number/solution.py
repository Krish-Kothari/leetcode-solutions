class Solution:
    def isHappy(self, n: int) -> bool:
        def f(x):
            c=0
            while x>0:
                d=x%10
                c+=d**2
                x//=10
            return c
        seen=set()
        while n!=1 and n not in seen:
            seen.add(n)
            n=f(n)
        return n==1
