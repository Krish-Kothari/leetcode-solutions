class Solution:
    def sortColors(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero=one=two=0
        for i in nums:
            if i==0:
                zero+=1
            elif i==1:
                one+=1
            else:
                two+=1
        for i in range(len(nums)):
            if zero>0:
                nums[i]=0
                zero-=1
            elif one>0:
                nums[i]=1
                one-=1
            else:
                nums[i]=2
                two-=1
        
