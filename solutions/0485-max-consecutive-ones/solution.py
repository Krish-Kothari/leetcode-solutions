class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        maxi=result=0
        for i in nums:
            if i==1:
                result+=1
                maxi=max(maxi,result)
            else:
                result=0
        return maxi

