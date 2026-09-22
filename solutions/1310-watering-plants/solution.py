class Solution:
    def wateringPlants(self, plants: list[int], capacity: int) -> int:
        ans=0
        k=capacity
        for i,x in enumerate(plants): 
            if k<x: 
                ans+=2*i
                k=capacity
            ans+=1
            k-=x
        return ans
