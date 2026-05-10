class Solution:
    def replaceNonCoprimes(self, nums: List[int]) -> List[int]:
        stack=[]
        for i in nums:
            while stack:
                g=gcd(stack[-1],i)
                if g==1:
                    break
                i=(stack.pop()*i)//g
            stack.append(i)
        return stack
