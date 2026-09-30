class Solution:
    def reverse(self, x: int) -> int:
        s=str(x)
        ans=''
        if s[0]=='-':
            ans+='-'
            ans+=s[1:][::-1]
        else:
            ans+=s[::-1]
        g=int(ans)
        if g<-2**31 or g>2**31-1:
            return 0
        return g
