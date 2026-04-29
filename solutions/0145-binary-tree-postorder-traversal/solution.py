# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans=[]
        def f(x):
            if not x:
                return
            f(x.left)
            f(x.right)
            ans.append(x.val)
        f(root)
        return ans
