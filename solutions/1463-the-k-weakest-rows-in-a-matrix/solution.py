class Solution:
    def kWeakestRows(self, mat: List[List[int]], k: int) -> List[int]:
        row_strengths=[]
        for i, row in enumerate(mat):
            row_strengths.append((sum(row),i))
        row_strengths.sort()
        return [row[1] for row in row_strengths[:k]]
