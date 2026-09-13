class Solution:
    def maxFreqSum(self, s: str) -> int:
        con=0
        vow=0
        x=set(s)
        for i in x:
            if i in "aeiou":
                vow=max(vow,s.count(i))
            else:
                con=max(con,s.count(i))
        return con+vow 

