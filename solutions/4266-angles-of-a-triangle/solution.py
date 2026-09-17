class Solution:
    def internalAngles(self, sides: list[int]) -> list[float]:
        a,b,c=sorted(sides)
        if a+b<=c:
            return []
        angleA=degrees(acos((b*b+c*c-a*a)/(2*b*c)))
        angleB=degrees(acos((a*a+c*c-b*b)/(2*a*c)))
        return [angleA,angleB,180-angleA-angleB]

