class Solution(object):
    def searchRange(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        def first():
            ans=-1
            n=len(nums)
            lo=0
            hi=n-1
            while lo<=hi:
                m=(lo+hi)//2
                if nums[m]==target:
                    ans=m
                    hi=m-1
                elif nums[m]>target:
                    hi=m-1
                elif nums[m]<target:
                    lo=m+1
            return ans
        def last():
            ans=-1
            n=len(nums)
            lo=0
            hi=n-1
            while lo<=hi:
                m=(lo+hi)//2
                if nums[m]==target:
                    ans=m
                    lo=m+1
                elif nums[m]>target:
                    hi=m-1
                elif nums[m]<target:
                    lo=m+1
            return ans
        return [first(),last()]
