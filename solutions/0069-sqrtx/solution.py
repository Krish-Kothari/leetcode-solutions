class Solution(object):
    def mySqrt(self, x):
        """
        :type x: int
        :rtype: int
        """
        lo,hi=0,x//2+1
        while lo<=hi:
            m=(lo+hi)//2
            sqrt=m*m
            if sqrt==x:
                return m
            elif sqrt>x:
                hi=m-1
            elif sqrt<x:
                lo=m+1
        return hi
