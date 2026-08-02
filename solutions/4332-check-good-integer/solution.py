class Solution(object):
    def checkGoodInteger(self, n):
        """
        :type n: int
        :rtype: bool
        """
        digi=0
        sqr=0
        x=n
        while x>0:
            d=x%10
            digi+=d
            sqr+=d**2
            x//=10
        return (sqr-digi)>=50

