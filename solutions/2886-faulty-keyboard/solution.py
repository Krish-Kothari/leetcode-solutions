class Solution(object):
    def finalString(self, s):
        """
        :type s: str
        :rtype: str
        """
        ans = []
        for i in s:
            if i == 'i':
                ans.reverse()
            else:
                ans.append(i)

        return ''.join(ans)
