class Solution:
    def smallestRangeI(self, nums: List[int], k: int) -> int:
        M,m=max(nums),min(nums)
        diff,e=M-m,2*k
        if diff<=e:
            return 0
        else:
            return diff-e
