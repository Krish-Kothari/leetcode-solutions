class Solution:
    def canAliceWin(self, nums: List[int]) -> bool:
        c1=0
        c2=0
        for i in nums:
            if i<10:
                c1+=i
            else:
                c2+=i
        return c1!=c2
