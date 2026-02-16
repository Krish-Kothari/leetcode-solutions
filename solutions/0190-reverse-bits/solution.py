class Solution:
    def reverseBits(self, n: int) -> int:
        num=0
        for i in range(32):
            num+=n&1
            num=num*2
            n=n>>1          
        num=num//2
        return num

