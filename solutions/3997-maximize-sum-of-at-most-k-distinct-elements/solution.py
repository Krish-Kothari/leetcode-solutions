class Solution:
    def maxKDistinct(self, nums: List[int], k: int) -> List[int]:
        if k==1:
            return [max(nums)]
        nums=set(nums)
        nums=list(nums)
        nums.sort()
        nums=nums[::-1]
        return nums[:k]
