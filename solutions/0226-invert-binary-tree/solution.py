# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def f(x):
            if not x:
                return
            f(x.left)
            f(x.right)
            x.left,x.right=x.right,x.left
            return x
        return f(root)

