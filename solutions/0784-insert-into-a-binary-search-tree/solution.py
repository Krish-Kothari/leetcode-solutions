# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def insertIntoBST(self, root, val):
        """
        :type root: Optional[TreeNode]
        :type val: int
        :rtype: Optional[TreeNode]
        """
        def f(x,val):
            if x==None:
                return TreeNode(val)
            if x.val<val:
                x.right=f(x.right,val)
            if x.val>val:
                x.left=f(x.left,val)
            return x
        return f(root,val)
