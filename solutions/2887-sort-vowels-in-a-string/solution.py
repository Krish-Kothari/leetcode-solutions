class Solution:
    def sortVowels(self, s: str) -> str:
        vowels=['a','e','i','o','u','A','E','I','O','U']
        ans=[]
        d=[]
        final=[]
        for i,j in enumerate(s):
            if j in vowels:
                ans.append(j)
                d.append(i)
        ans.sort()
        for i in s:
            final.append(i)
        for i in range(len(ans)):
            final[d[i]]=ans[i]
        return ''.join(final)
