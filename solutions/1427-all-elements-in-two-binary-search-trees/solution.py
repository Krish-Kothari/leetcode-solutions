# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def getAllElements(self, root1, root2):
        """
        :type root1: Optional[TreeNode]
        :type root2: Optional[TreeNode]
        :rtype: List[int]
        """
        ans=[]
        def f(x):
            if not x:
                return 0
            f(x.left)
            ans.append(x.val)
            f(x.right)
        f(root1)
        f(root2)
        ans.sort()
        return ans
