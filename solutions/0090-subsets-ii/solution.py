class Solution(object):
    def subsetsWithDup(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        nums.sort()
        arr=[]
        def f(ans,i):
            if i==len(nums):
                if ans in arr:
                    return
                arr.append(ans[:])
                return
            ans.append(nums[i])
            f(ans,i+1)
            ans.pop()
            f(ans,i+1)
        f([],0)
        return arr
