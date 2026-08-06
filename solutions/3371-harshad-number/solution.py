class Solution(object):
    def sumOfTheDigitsOfHarshadNumber(self, x):
        """
        :type x: int
        :rtype: int
        """
        n=x
        ans=0
        while n>0:
            d=n%10
            ans+=d
            n//=10
        if x%ans==0:
            return ans
        else:
            return -1
