class Solution(object):
    def countOppositeParity(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        result=[]
        n=len(nums)
        for i in range(n):
            score=0
            for j in range(i+1,n):
                if nums[i]%2==0 and nums[j]%2!=0:
                    score=score+1
                if nums[j]%2==0 and nums[i]%2!=0:
                    score=score+1
            result.append(score)
        return result
