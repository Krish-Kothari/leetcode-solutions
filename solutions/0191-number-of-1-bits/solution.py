class Solution(object):
    def hammingWeight(self, n):
        """
        :type n: int
        :rtype: int
        """
        c=0
        while n>0:
            d=n%2
            if d==1:
                c+=1
            n//=2
        return c
