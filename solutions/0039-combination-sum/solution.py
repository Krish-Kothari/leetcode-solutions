class Solution(object):
    def combinationSum(self, candidates, target):
        """
        :type candidates: List[int]
        :type target: int
        :rtype: List[List[int]]
        """
        n=len(candidates)
        ans=[]
        def f(i,curr,currSum):
            if currSum==target:
                ans.append(curr[:])
                return
            if currSum>target or i==n:
                return
            curr.append(candidates[i])
            f(i,curr,currSum+candidates[i])
            curr.pop()
            f(i+1,curr,currSum)
        f(0,[],0)
        return ans
