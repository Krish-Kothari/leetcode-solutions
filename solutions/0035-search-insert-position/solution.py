class Solution(object):
    def searchInsert(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        n=len(nums)
        lo=0
        hi=n-1
        while lo<=hi:
            m=(lo+hi)//2
            if nums[m]==target:
                return m
            elif nums[m]>target:
                hi=m-1
            elif nums[m]<target:
                lo=m+1
        return lo
