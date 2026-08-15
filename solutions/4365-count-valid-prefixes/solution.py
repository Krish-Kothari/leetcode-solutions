class Solution(object):
    def countValidPrefixes(self, s):
        """
        :type s: str
        :rtype: int
        """
        n = len(s)
        zero_count = 0
        one_count = 0
        res = 0
        for i in range(n):
            if(s[i] == '0'):
                zero_count+=1
            else:
                one_count+=1
            if(abs(one_count - zero_count)==1 or abs(one_count - zero_count)==0):
                res+=1
        return res
