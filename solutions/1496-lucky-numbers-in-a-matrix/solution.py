class Solution:
    def luckyNumbers(self, matrix: List[List[int]]) -> List[int]:
        x1=set()
        x2=set()
        for i in matrix:
            x1.add(min(i))
        for i in zip(*matrix):
            x2.add(max(i))
        return list(x1&x2)
