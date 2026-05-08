class Solution:
    def dominantIndex(self, nums: List[int]) -> int:
        nums1=sorted(nums)
        res=[]
        num=nums1[-1]
        for i in range(len(nums)-1):
            res.append(nums1[i]*2)
        for j in range(len(res)):
            if num>=res[i]:
                return nums.index(num)
        return -1
