class Solution:
    def checkDivisibility(self, n: int) -> bool:
        x=str(n)
        p=1
        s=0
        for i in x:
            p*=int(i)
            s+=int(i)   
        return n%(p+s)==0
