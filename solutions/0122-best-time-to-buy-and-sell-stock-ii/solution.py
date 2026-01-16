class Solution(object):
    def maxProfit(self, prices):
        n=len(prices)
        c=0
        for i in range(1,n):
            if prices[i]>prices[i-1]:
                c+=prices[i]-prices[i-1]
        return(c)
