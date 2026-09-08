class Solution(object):
    def heightChecker(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        c=0
        x=sorted(heights)
        for i in range(len(x)):
            if x[i]!=heights[i]:
                c+=1
        return c
