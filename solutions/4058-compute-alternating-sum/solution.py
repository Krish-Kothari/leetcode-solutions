class Solution(object):
    def alternatingSum(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        x=nums[::2]
        y=nums[1::2]
        return sum(x)-sum(y)
