class Solution:
    def findGCD(self, nums: List[int]) -> int:
        import math
        s=min(nums)
        l=max(nums)
        return math.gcd(s,l)
