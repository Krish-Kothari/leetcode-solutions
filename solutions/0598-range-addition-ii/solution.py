class Solution:
    def maxCount(self, m: int, n: int, ops: List[List[int]]) -> int:
        r=m
        c=n
        for i in range(len(ops)):
            r=min(r,ops[i][0])
            c=min(c,ops[i][1])
        return r*c
