class Solution:
    def splitNum(self, num: int) -> int:
        nums = list(str(num))
        nums = sorted(nums)
        num1 = ""
        num2 = ""
        for i in range(1, len(nums)+1):
            if i % 2 !=0:
                num1 += nums[i-1]
            else:
                num2 += nums[i-1]
        return int(num1) + int(num2)
        print(num1)
        print(num2)
        print(nums)
