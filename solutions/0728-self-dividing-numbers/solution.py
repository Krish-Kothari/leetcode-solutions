class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        c=[]
        for i in range(left,right+1):
            for j in str(i):
                if int(j)==0 or i%int(j)!=0:
                    break
            else:
                c.append(i)
        return c
