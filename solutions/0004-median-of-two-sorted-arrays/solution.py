class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        nums1.extend(nums2)
        nums1.sort()
        m=len(nums1)
        if m%2==0:
            return (nums1[m//2-1]+nums1[m//2])/2
        else:
            return nums1[m//2]
