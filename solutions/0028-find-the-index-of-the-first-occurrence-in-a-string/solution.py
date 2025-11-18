class Solution(object):
    def strStr(self, haystack, needle):
        y=False
        for i in range(len(haystack)):
            if haystack[i:i+len(needle)]==needle:
                return(i)
        else:
            return(-1)
