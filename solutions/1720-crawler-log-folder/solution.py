class Solution:
    def minOperations(self, logs: List[str]) -> int:
        d=0
        for i in logs:
            if i=="../":
                if d>0:
                    d-=1
            elif i=="./":
                continue
            else:
                d+=1
        return d
