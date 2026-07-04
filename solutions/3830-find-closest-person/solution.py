class Solution(object):
    def findClosest(self, x, y, z):
        """
        :type x: int
        :type y: int
        :type z: int
        :rtype: int
        """
        a=abs(x-z)
        b=abs(y-z)
        if a==b:
            return 0
        if min(a,b)==a:
            return 1
        else:
            return 2
