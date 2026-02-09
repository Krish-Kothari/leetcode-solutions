class Solution(object):
    def countBits(self, n):
        """
        :type n: int
        :rtype: List[int]
        """
        x=[]
        for i in range(n+1):
            c=0
            while i>0:
                d=i%2
                if d==1:
                    c+=1
                i//=2
            x.append(c)
        return x
