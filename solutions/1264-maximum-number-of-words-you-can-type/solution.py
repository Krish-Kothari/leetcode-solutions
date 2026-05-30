class Solution:
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        c=0
        text=text.split()
        for i in text:
            flag=True
            for j in brokenLetters:
                if j in i:
                    flag=False
            if flag:
                c+=1
        return c                    
            
