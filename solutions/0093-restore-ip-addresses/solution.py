class Solution(object):
    def restoreIpAddresses(self, s):
        """
        :type s: str
        :rtype: List[str]
        """
        ans=[]
        if len(s)>12:
            return ans
        def f(i,dots,curr):
            if dots==4 and i==len(s):
                ans.append(curr[:-1])
                return
            if dots>4:
                return
            for j in range(i,min(i+3,len(s))):
                num=int(s[i:j+1])
                if num<=255 and (i==j or int(s[i])!=0):
                    f(j+1,dots+1,curr+s[i:j+1]+'.')
        f(0,0,'')
        return ans
