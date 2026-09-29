from itertools import combinations
class Solution:
    def minPairSum(self, nums: List[int]) -> int:
        nums.sort()
        c=0
        n=len(nums)
        for i in range(n//2):
            x=nums[i]+nums[n-i-1]
            if x>c:
                c=x
        return c
