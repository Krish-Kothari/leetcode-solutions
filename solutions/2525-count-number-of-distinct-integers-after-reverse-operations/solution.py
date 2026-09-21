class Solution:
    def countDistinctIntegers(self, nums: list[int]) -> int:
        distinct=set()
        for i in nums:
            distinct.add(i)
            x=0
            while i>0:
                x*=10
                x+=i%10
                i//=10
            distinct.add(x)
        return len(distinct)
