class Solution:
    def largestGoodInteger(self, num: str) -> str:
        count=0
        prev='X'
        maxd=' '
        for i in num:
            if i==prev:
                count+=1
            else:
                count=1
            if count==3:
                maxd=max(i, maxd)
            prev=i
        if maxd==' ':
            return ""
        return maxd*3
