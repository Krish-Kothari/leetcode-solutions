class Solution(object):
    def isAdjacentDiffAtMostTwo(self, s):
        """
        :type s: str
        :rtype: bool
        """
        c=[]
        d=len(s)
        p=0
        for i in range(0,d):
            c.append(eval(s[i]))
        for i in range(d-1):
            if (abs(c[i]-c[i+1])<=2):
                p+=1
        if( p==(d-1)):
            return True
        return False
