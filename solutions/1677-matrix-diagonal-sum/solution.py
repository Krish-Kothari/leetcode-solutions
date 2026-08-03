class Solution(object):
    def diagonalSum(self, mat):
        """
        :type mat: List[List[int]]
        :rtype: int
        """
        n=len(mat)
        ans=0
        for i in range(len(mat)):
            for j in range(len(mat[0])):
                if i==j or i+j==n-1:
                    ans+=mat[i][j]
        return ans
