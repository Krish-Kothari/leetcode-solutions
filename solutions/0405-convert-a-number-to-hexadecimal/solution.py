class Solution:
    def toHex(self, num: int) -> str:
        if num == 0:
            return '0'
        x = '0123456789abcdef'
        result = ''
        if num < 0:
            num += 2**32
        while num > 0:
            digit = num % 16
            num = (num - digit) // 16
            result += x[digit]
        return result[::-1]
