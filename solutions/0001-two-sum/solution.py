class Solution(object):
    def twoSum(self, nums, target):
        n=len(nums)
        x=[]
        for i in range(n):
            for j in range(i+1,n):
                if nums[i]+nums[j]==target:
                    x.append(i)
                    x.append(j)
        return x
