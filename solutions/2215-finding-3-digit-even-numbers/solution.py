class Solution:
    def findEvenNumbers(self, digits: List[int]) -> List[int]:
        count=Counter(digits)
        res=[]
        for num in range(100,1000,2):
            d1,d2,d3=num//100,(num//10)%10,num%10
            num_count=Counter([d1, d2, d3])
            if all(count[d] >= num_count[d] for d in num_count):
                res.append(num)
                
        return res
