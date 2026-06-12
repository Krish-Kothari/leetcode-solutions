class Solution:
    def leftRightDifference(self, nums: List[int]) -> List[int]:
        right=sum(nums)
        left=0
        result=[]
        for i in nums:
            right-=i
            result.append(abs(left-right))
            left+=i
        return result
