class Solution(object):
    def maxProfit(self, prices):
        mm=float('inf')
        maxm=0
        for i in prices:
            if i<mm:
                mm=i
            elif i-mm>maxm:
                maxm=i-mm
        return(maxm)
        
