class Solution(object):
    def maximizeSum(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        m = nums[0]
        for i in nums:
            if i > m:
                m = i
        ans = 0
        for i in range(0, k):
            ans += m
            m += 1
        return ans
