class Solution:
    def differenceOfSums(self, n: int, m: int) -> int:
        x=[]
        y=[]
        for i in range(1,n+1):
            if i%m==0:
                y.append(i)
            else:
                x.append(i)
        return sum(x)-sum(y)
