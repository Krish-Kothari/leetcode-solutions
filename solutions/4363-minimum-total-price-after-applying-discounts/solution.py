class Solution(object):
    def minPrice(self, prices, discounts):
        """
        :type prices: List[int]
        :type discounts: List[int]
        :rtype: float
        """
        prices.sort(reverse=True)
        discounts.sort(reverse=True)
        total_sum = 0.0
        for i in range(len(prices)):
            if i < len(discounts):
                discounted_price = prices[i] * (100 - discounts[i]) / 100.0
                total_sum += discounted_price
            else:
                total_sum += prices[i]
        return total_sum
