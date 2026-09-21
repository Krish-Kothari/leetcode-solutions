class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        c=0
        for i in range(1,len(nums)):
            left=nums[0:i+1]
            right=nums[i+1:]
            if (sum(left)-sum(right))%2==0:
                c+=1
        return c
