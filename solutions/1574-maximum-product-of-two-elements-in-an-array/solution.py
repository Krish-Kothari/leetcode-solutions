class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        x=max(nums)
        nums.remove(x)
        y=max(nums)
        return (x-1)*(y-1)
