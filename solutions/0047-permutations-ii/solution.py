from itertools import permutations
class Solution(object):
    def permuteUnique(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """

        x=[]
        for i in permutations(nums):
            x.append(i)
        g=set(x)
        x=list(g)
        return x
