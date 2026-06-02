class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        n = len(arr)
        maxi = -1
        for i in range (n -1, -1, -1):
            temp = arr[i]
            arr[i] = maxi
            maxi = max(maxi, temp)
        return arr  
