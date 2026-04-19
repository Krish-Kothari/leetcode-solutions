class Solution:
    def mirrorDistance(self, n: int) -> int:
        x=str(n)
        x=x[::-1]
        x=int(x)
        return abs(x-n)
