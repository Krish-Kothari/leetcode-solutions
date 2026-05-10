# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        x=[]
        while head:
            x.append(head.val)
            head=head.next
        x.sort()
        dummy = ListNode(0)
        curr = dummy
        for i in x:
            curr.next=ListNode(i)
            curr=curr.next
        return dummy.next
