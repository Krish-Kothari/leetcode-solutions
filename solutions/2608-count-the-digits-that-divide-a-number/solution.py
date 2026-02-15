class Solution:
    def countDigits(self, num: int) -> int:
        c=0
        temp=num
        while temp>0:
            d=temp%10
            if num%d==0:
                c+=1
            temp//=10
        return c
