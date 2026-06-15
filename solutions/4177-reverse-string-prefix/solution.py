class Solution:
    def reversePrefix(self, s: str, k: int) -> str:
        x1=s[:k]
        x1=x1[::-1]
        return x1+s[k:]
