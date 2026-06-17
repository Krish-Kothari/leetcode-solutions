class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        x=set()
        for i in paths:
            x.add(i[0])
        for i in paths:
            if i[1] not in x:
                return i[1]
