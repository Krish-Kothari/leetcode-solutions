class Solution:
    def search(self, nums: List[int], target: int) -> int:
        lo=0
        hi=len(nums)-1
        result=-1
        while lo<=hi:
            m=(lo+hi)//2
            if nums[m]==target:
                result=m
                break
            elif nums[m]<target:
                lo=m+1
            else:
                hi=m-1
        return result
