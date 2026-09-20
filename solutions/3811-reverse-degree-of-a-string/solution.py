class Solution:
    def reverseDegree(self, s: str) -> int:
        total=0
        for i,ch in enumerate(s,1):
            diff=123-ord(ch)
            total+=diff*i
        return total
