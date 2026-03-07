class Solution:
    def isHappy(self, n: int) -> bool:
        s = set()
        while n not in s:
            s.add(n)
            new_num = 0
            temp_num = n
            while temp_num != 0:
                new_num += (temp_num%10) ** 2
                temp_num = temp_num//10
            if new_num == 1:
                return True
            n = new_num
        return False
