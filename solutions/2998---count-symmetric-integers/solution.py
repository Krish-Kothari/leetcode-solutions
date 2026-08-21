class Solution(object):
    def countSymmetricIntegers(self, low, high):
        """
        :type low: int
        :type high: int
        :rtype: int
        """
        c=0
        for i in range(low,high+1):
            s=str(i)
            if len(s)%2==0:
                mid=len(s)//2
                if sum(map(int,s[:mid]))==sum(map(int,s[mid:])):
                    c+=1
        return c
