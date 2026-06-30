class Solution(object):
    def countHomogenous(self, s):
        """
        :type s: str
        :rtype: int
        """
        l=0
        r=0
        for i in range(len(s)):
            if s[l]==s[i]:
                r+=i-l+1
            else:
                r+=1
                l=i
        return r%(10**9+7)
