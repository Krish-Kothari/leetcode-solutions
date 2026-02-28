class Solution:
    def triangleType(self, nums: List[int]) -> str:
        if nums[0] + nums[1] <= nums[2] or nums[1] + nums[2] <= nums[0] or nums[2] + nums[0] <= nums[1]:
            return "none"
        a = set(nums)
        if len(a) == 1:
            return "equilateral"
        elif len(a) == 2:
            return "isosceles"
        else:
            return "scalene"
