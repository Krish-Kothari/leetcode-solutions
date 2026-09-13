class Solution:
    def validStrings(self, n: int) -> List[str]:
        ans=[]
        for i in product("01",repeat=n):
            s="".join(i)
            if "00" not in s:
                ans.append(s)
        return ans
