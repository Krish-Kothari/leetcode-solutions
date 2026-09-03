class Solution(object):
    def combinationSum2(self, candidates, target):
        """
        :type candidates: List[int]
        :type target: int
        :rtype: List[List[int]]
        """
        candidates.sort()
        ans=[]
        n=len(candidates)
        def f(i,curr,currSum):
            if currSum==target:
                ans.append(curr[:])
                return
            if i==n or currSum>target:
                return
            curr.append(candidates[i])
            f(i+1,curr,currSum+candidates[i])
            curr.pop()
            while i+1<n and candidates[i]==candidates[i+1]:
                i+=1
            f(i+1,curr,currSum)
        f(0,[],0)
        return ans
