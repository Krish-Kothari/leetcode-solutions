class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        ans=[]
        for i in nums1:
            ng=-1
            target_found=False

            for j in nums2:
                if j==i:
                    target_found=True
                elif target_found:
                    if j>i:
                        ng=j
                        break
            ans.append(ng)
        return ans
