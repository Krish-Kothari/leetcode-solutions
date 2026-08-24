# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def bstFromPreorder(self, preorder):
        """
        :type preorder: List[int]
        :rtype: Optional[TreeNode]
        """
        if not preorder:
            return None
        root=TreeNode(preorder[0])
        p=root
        stack=[p]
        for i in preorder[1:]:
            newNode=TreeNode(i)
            if stack and newNode.val<p.val:
                p.left=newNode
                stack.append(newNode)
                p=newNode
            else:
                while stack and newNode.val>stack[-1].val:
                    p=stack.pop()
                p.right=newNode
                stack.append(newNode)
                p=newNode
        return root
