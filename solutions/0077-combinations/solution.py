from itertools import combinations
class Solution:
    def combine(self, n: int, k: int) -> list[list[int]]:
        x=[]
        ans=[]
        for i in range(1,n+1):
            x.append(i)
        for j in combinations(x,k):
            ans.append(j)
        return ans
