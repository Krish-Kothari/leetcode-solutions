class Solution(object):
    def plusOne(self, digits):
        """
        :type digits: List[int]
        :rtype: List[int]
        """
        k=[]
        l=0
        for i in digits:
            l=l*10+i
        l+=1
        x=str(l)
        for g in x:
            k.append(int(g))
        return k
