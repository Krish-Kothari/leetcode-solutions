class Solution:
    def maxContainers(self, n: int, w: int, maxWeight: int) -> int:
        return int(min(n*n,maxWeight/w))
