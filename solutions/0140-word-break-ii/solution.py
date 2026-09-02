class Solution(object):
    def wordBreak(self, s, wordDict):
        """
        :type s: str
        :type wordDict: List[str]
        :rtype: List[str]
        """
        ans=[]
        n=len(s)
        def f(i,curr):
            if i==n:
                if curr:
                    ans.append(' '.join(curr))
                    return
            for j in range(i+1,n+1):
                word=s[i:j]
                if word in wordDict:
                    curr.append(word)
                    f(j,curr)
                    curr.pop()
        f(0,[])
        return ans
