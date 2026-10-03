class Solution:
    def missingMultiple(self, nums: List[int], k: int) -> int:
        p=set(nums)
        ans=k
        while ans in p:
            ans+=k
        return ans
