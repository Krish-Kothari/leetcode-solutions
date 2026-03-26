class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        l1="qwertyuiop"
        l2="asdfghjkl"
        l3="zxcvbnm"
        x=[]
        for i in words:
            w=i.lower()
            if len(set(l1+w))==len(l1) or len(set(l2+w))==len(l2) or len(set(l3+w))==len(l3):
                x.append(i)
        return x
