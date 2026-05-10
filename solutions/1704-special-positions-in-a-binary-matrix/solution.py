class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        c=0
        n1=len(mat)
        n2=len(mat[0])
        for i in range(n1):
            for j in range(n2):
                if mat[i][j]==1:
                    if sum(mat[i])==1:
                        col=0
                        for x in range(n1):
                            col+=mat[x][j]
                        if col==1:
                            c+=1
        return c
