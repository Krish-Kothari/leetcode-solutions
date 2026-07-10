class Solution(object):
    def mapWordWeights(self, words, weights):
        """
        :type words: List[str]
        :type weights: List[int]
        :rtype: str
        """
        ans=[]
        for i in words:
            c=0
            for j in range(len(i)):
                c+=weights[ord(i[j])-ord('a')]
            ans.append(chr(ord('a')+(25-(c%26))))
        return "".join(ans)
