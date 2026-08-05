class Solution(object):
    def separateDigits(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        ans=[]
        for i in nums:
            temp=[]
            while i>0:
                d=i%10
                temp.append(d)
                i//=10
            ans.extend(temp[::-1])
        return ans
