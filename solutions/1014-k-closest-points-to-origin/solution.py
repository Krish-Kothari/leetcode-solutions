class Solution:
    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:
        ans=[]
        for i,j in enumerate(points):
            c=j[0]**2+j[1]**2
            ans.append([c,i])
        ans.sort()
        final=[]
        for i in range(k):
            final.append(points[ans[i][1]])
        return final
