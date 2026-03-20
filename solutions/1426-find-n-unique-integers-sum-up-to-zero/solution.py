class Solution:
    def sumZero(self, n: int) -> List[int]:
        l=[]
        x=n//2
        for i in range(1,x+1):
            l.append(i)
            l.append(-i)
        if n%2==1:
            l.append(0)
        return l
        
