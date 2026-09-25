class Solution:
    def findDuplicates(self, nums: list[int]) -> list[int]:
        x=[]
        d=set()
        for i in nums:
            if i in d:
                x.append(i)
            else:
                d.add(i)
        return x
