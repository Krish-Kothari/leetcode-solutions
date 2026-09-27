class Solution:
    def countDigitOccurrences(self, nums: list[int], digit: int) -> int:
        c=0
        for i in nums:
            x=str(i)
            c+=x.count(str(digit))
        return c
