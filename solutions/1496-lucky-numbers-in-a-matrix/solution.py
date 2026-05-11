class Solution:
    def luckyNumbers(self, matrix: List[List[int]]) -> List[int]:
        n=len(matrix)
        m=len(matrix[0])
        x1=set()
        x2=set()
        for i in matrix:
            x1.add(min(i))
        for j in range(m):
            g=matrix[0][j] 
            for i in range(1,n):
                if matrix[i][j]>g:
                    g=matrix[i][j]
            x2.add(g)
        return list(x1&x2)
