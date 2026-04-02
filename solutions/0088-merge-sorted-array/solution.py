class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        nums1Idx=0
        nums2Idx=0
        result=[]
        while nums1Idx<m and nums2Idx<n:
            if nums1[nums1Idx]<nums2[nums2Idx]:
                result.append(nums1[nums1Idx])
                nums1Idx+=1
            else:
                result.append(nums2[nums2Idx])
                nums2Idx+=1
        while nums1Idx<m:
            result.append(nums1[nums1Idx])
            nums1Idx+=1
        while nums2Idx<n:
            result.append(nums2[nums2Idx])
            nums2Idx+=1
        for i in range(len(result)):
            nums1[i]=result[i]
