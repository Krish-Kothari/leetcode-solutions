class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        x=[]
        for i in candies:
            if i+extraCandies>=max(candies):
                x.append(True)
                i=i+extraCandies
            else:
                x.append(False)
                i=i+extraCandies
        return x
