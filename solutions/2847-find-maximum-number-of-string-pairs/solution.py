class Solution:
    def maximumNumberOfStringPairs(self, words: List[str]) -> int:
        s=set()
        ans=0
        for i in words:
            if i in s:
                ans+=1
            else:
                s.add(i[::-1])
        return ans
