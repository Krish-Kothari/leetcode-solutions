class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        row = len(matrix)
        col = len(matrix[0])
        trans = [[0] * row for _ in range(col)]
        for i in range(col):
            for j in range(row):
                trans[i][j] = matrix[j][i]
        return trans
