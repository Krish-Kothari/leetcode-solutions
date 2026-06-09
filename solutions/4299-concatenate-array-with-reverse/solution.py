class Solution:
    def concatWithReverse(self, nums: list[int]) -> list[int]:
        n1=nums[::-1]
        nums.extend(n1)
        return nums
