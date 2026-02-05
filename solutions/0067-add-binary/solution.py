class Solution(object):
    def addBinary(self, a, b):
        """
        :type a: str
        :type b: str
        :rtype: str
        """
        s = []
        C= 0
        i = len(a) - 1
        j = len(b) - 1
        while i >= 0 or j >= 0 or C:
            if i >= 0:
                C += int(a[i])
                i -= 1
            if j >= 0:
                C += int(b[j])
                j -= 1
            s.append(str(C % 2))
            C //= 2
        return ''.join(reversed(s))
        
