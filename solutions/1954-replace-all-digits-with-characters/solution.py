class Solution:
    def replaceDigits(self, s: str) -> str:
        l=""
        ans=0
        for i in s:
            if i.isalpha():
                l+=i
                ans=ord(i)
            else:
                l+=str(chr(ans+int(i)))
        return l
