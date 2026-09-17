class Solution:
    def simplifiedFractions(self, n: int) -> List[str]:
        ans=[]
        for i in range(2,n+1): 
            for j in range(1,i):
                if gcd(j,i)==1:
                    ans.append(f"{j}/{i}")
        return ans
