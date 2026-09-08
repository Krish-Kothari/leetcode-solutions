class Solution(object):
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        seen=[0]*len(nums)
        for i in nums:
            if seen[i]:
                return i
            seen[i]=1
