class Solution:
    def findMissingElements(self, nums: List[int]) -> List[int]:
        x=set(nums)
        a=set(range(min(x)+1,max(x)))
        return sorted(a-x)

