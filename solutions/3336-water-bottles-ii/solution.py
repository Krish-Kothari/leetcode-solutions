class Solution(object):
    def maxBottlesDrunk(self, numBottles, x):
        """
        :type numBottles: int
        :type numExchange: int
        :rtype: int
        """
        ans = numBottles
        while numBottles >= x:
            numBottles -= x - 1
            x += 1
            ans += 1
        return ans
