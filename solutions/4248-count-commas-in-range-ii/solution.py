class Solution(object):
    def countCommas(self, n):
        """
        :type n: int
        :rtype: int
        """
        commas=0
        x=1000
        while n>=x:
            commas+=(n-x+1)
            x*=1000
        return commas
