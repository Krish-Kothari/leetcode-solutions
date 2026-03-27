class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        a=word.isupper()
        b=word.islower()
        c=word[0].isupper() and word[1:].islower()
        return a or b or c
