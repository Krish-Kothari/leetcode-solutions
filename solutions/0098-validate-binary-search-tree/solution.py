# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isValidBST(self, root):
        """
        :type root: Optional[TreeNode]
        :rtype: bool
        """
        lo=[float("-inf")]
        def f(x):
            if not x:
                return True
            if not f(x.left):
                return False
            if x.val<=lo[0]:
                return False
            lo[0]=x.val
            return f(x.right)
        return f(root)
