class Solution:
    def countKDifference(self, nums: List[int], k: int) -> int:
        c=0
        for i in nums:
            for j in nums:
                if j>i and j-i==k:
                    c+=1
        return c
