from itertools import combinations
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        ans=[]
        for i in range(len(nums)+1):
            for j in combinations(nums,i):
                ans.append(j)
        return ans
