class Solution:
    def differenceOfSum(self, nums: List[int]) -> int:
        ele=0
        d=0
        for i in nums:
            ele+=i
            while i>0:
                d+=i%10
                i//=10
        return abs(ele-d)
