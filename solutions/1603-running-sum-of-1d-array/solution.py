class Solution(object):
    def runningSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        l=[]
        for i in nums:
            if len(l)>0:
                l.append(l[-1]+i)
            else:
                l.append(i)
        return l
