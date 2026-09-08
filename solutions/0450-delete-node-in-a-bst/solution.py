# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def deleteNode(self, root, key):
        """
        :type root: Optional[TreeNode]
        :type key: int
        :rtype: Optional[TreeNode]
        """
        if not root:
            return
        if key<root.val:
            root.left=self.deleteNode(root.left, key)
            return root
        if key>root.val:
            root.right=self.deleteNode(root.right, key)
            return root
        else:
            if not root.left and not root.right:
                return None
            if not root.right:
                return root.left
            if not root.left:
                return root.right
            current=root.right
            while current.left:
                current=current.left
            root.val=current.val
            root.right=self.deleteNode(root.right,root.val)
        return root
