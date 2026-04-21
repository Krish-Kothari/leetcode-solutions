class Solution:
    def numberOfSubarrays(self, nums: List[int], k: int) -> int:
        res=count=l=0
        for i in range(len(nums)):
            if nums[i] % 2:
                k -= 1
                count = 0
            while not k:
                k += (nums[l] % 2)
                count += 1
                l += 1
            res += count
        return res
