class Solution(object):
    def removeTrailingZeros(self, num):
        """
        :type num: str
        :rtype: str
        """
        n=int(num)
        while n>0:
            d=n%10
            if d==0:
                n//=10
            else:
                break
        return str(n)
