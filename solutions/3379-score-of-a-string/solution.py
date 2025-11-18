class Solution(object):
    def scoreOfString(self, s):
        x=0
        # s=input()
        for i in range(1,len(s)):
            x+=(abs(ord(s[i])-ord(s[i-1])))
        return(x)
