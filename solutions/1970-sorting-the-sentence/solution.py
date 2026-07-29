class Solution(object):
    def sortSentence(self, s):
        """
        :type s: str
        :rtype: str
        """
        ans=[]
        x=s[::-1].split()
        x.sort()
        for i in x:
            ans.append(i[1:][::-1])
        return ' '.join(ans)
