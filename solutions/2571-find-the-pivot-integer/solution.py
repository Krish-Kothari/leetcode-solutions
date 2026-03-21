class Solution:
    def pivotInteger(self, n: int) -> int:
        total=n*(n+1)//2
        x=int(math.sqrt(total))
        if x*x==total:
            return x
        return -1
