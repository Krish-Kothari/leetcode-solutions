# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        if head==None:
            return False
        slow=head
        fast=head
        while slow and fast and slow.next and fast.next and fast.next.next:
            slow=slow.next
            fast=fast.next.next
            if fast==slow:
                return True
        return False
        
