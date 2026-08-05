class Solution(object):
    def search(self, nums, target):
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
            elif target>nums[m]:
                lo=m+1
            else:
                hi=m-1
        return -1
