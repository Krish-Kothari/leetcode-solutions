class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        tSum=0
        sSum=0
        for i in t:
            tSum+=(ord(i))
        for i in s:
            sSum+=(ord(i))
        return chr(tSum-sSum)
