class Solution(object):
    def minMoves(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        x=max(nums)
        c=0
        for i in nums:
            c+=x-i
        return c
