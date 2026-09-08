# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def kthSmallest(self, root, k):
        """
        :type root: Optional[TreeNode]
        :type k: int
        :rtype: int
        """
        ans=[]
        def f(x):
            if not x:
                return 0
            f(x.left)
            ans.append(x.val)
            f(x.right)
        f(root)
        return ans[k-1]
