class Solution(object):
    def elevatorRequests(self, n, requests):
        """
        :type n: int
        :type requests: List[int]
        :rtype: int
        """
        t=0
        x=0
        for i in requests:
            t+=abs(i-x)
            x=i
        return t
