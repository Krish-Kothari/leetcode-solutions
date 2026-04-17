class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        g=[]
        x=heights
        x=sorted(x)
        x=x[::-1]
        for i in x:
            s=heights.index(i)
            g.append(names[s])
        return g
