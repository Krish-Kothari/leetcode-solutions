class Solution:
    def diStringMatch(self, s: str) -> List[int]:
        ans=[]
        smaller=0
        larger=len(s)
        for i in s:
            if i=='I':
                ans.append(smaller)
                smaller+=1
            else:
                ans.append(larger)
                larger-=1
        if s[-1]=='I':
            ans.append(larger)
        else:
            ans.append(smaller)
        return ans
