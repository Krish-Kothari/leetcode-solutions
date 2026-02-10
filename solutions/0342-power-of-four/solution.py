class Solution(object):
    def isPowerOfFour(self, n):
        """
        :type n: int
        :rtype: bool
        """
        def f(n):
            if n==1:
                return True
            if n<=0 or n%4!=0:
                return False
            return f(n//4)
        return f(n)
        
