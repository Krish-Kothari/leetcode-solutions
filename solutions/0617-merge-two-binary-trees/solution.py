# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: TreeNode | None, root2: TreeNode | None) -> TreeNode | None:
        if root1 is None and root2 is None:
            return None
        elif root1 is None:
            return root2
        elif root2 is None:
            return root1
        else:
            root=TreeNode(root1.val+root2.val)
            root.left=self.mergeTrees(root1.left,root2.left)
            root.right=self.mergeTrees(root1.right,root2.right)
            return root
