class Solution(object):
    def largestTimeFromDigits(self, arr):
        """
        :type arr: List[int]
        :rtype: str
        """
        arr.sort()
        for h in range(23, -1, -1):
            for m in range(59, -1, -1):
                t = [h//10, h % 10, m // 10, m % 10]
                ts = sorted(t)
                if ts == arr:
                    return str(t[0]) + str(t[1]) +':' + str(t[2]) + str(t[3])
        return ''
