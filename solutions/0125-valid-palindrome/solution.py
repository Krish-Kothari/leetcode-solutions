class Solution:
    def isPalindrome(self, s: str) -> bool:
        g=''
        for i in s:
            if i.isalnum():
                g+=i.lower()
        return g==g[::-1]
