class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []
        mapping={
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        res=[]
        def f(idx,path):
            if idx==len(digits):
                res.append("".join(path))
                return
            for i in mapping[digits[idx]]:
                path.append(i)
                f(idx+1,path)
                path.pop()
        f(0,[])
        return res
