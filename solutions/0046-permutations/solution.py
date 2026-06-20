from itertools import combinations
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        return list(map(list,permutations(nums)))
