class Solution:
    def findRelativeRanks(self, score: List[int]) -> List[str]:
        d={}
        n=len(score)
        temp=sorted(score)
        if n >= 1:
            d[temp[-1]] = "Gold Medal"
        if n >= 2:
            d[temp[-2]] = "Silver Medal"
        if n >= 3:
            d[temp[-3]] = "Bronze Medal"
        for i in range(n-3):
            d[temp[i]]=str(n-i)
        l=[]
        for i in score:
            
            l.append(d[i])
        return l
