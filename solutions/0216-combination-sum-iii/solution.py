from itertools import combinations
class Solution(object):
    def combinationSum3(self, k, n):
        """
        :type k: int
        :type n: int
        :rtype: List[List[int]]
        """
        ans=[]
        x=[1,2,3,4,5,6,7,8,9]
        for j in combinations(x,k):
            if sum(j)==n:
                ans.append(j)
        return ans
