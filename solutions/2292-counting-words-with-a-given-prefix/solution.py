class Solution(object):
    def prefixCount(self, words, pref):
        """
        :type words: List[str]
        :type pref: str
        :rtype: int
        """
        c=0
        x=len(pref)
        for i in words:
            if pref in i[:x]:
                c+=1
        return c
