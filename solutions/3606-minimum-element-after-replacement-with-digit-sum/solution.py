class Solution(object):
    def minElement(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        ans=float('inf')
        for i in nums:
            d=0
            while i:
                d+=i%10
                i//=10
            ans=min(ans,d)
        return ans
