class Solution(object):
    def arrayStringsAreEqual(self, word1, word2):
        """
        :type word1: List[str]
        :type word2: List[str]
        :rtype: bool
        """
        a1=''
        a2=''
        for i in word1:
            a1+=i
        for i in word2:
            a2+=i
        return a1==a2
