class Solution(object):
    def findPeakElement(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        n=len(nums)
        lo=0
        hi=n-1
        while lo<hi:
            m=(lo+hi)//2
            if nums[m]>nums[m+1]:
                hi=m
            else:
                lo=m+1
        return lo
