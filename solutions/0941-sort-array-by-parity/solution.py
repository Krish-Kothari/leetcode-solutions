class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        lo=0
        for i in range(len(nums)):
            if nums[i]%2==0:
                nums[lo],nums[i]=nums[i],nums[lo]
                lo+=1
        return nums

