class Solution:
    def recoverOrder(self, order: List[int], friends: List[int]) -> List[int]:
        x=[]
        for i in order:
            if i in friends:
                x.append(i)
        return x
