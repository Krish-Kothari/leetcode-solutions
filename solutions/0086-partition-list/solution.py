# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        g=[]
        temp=head
        tempo=head
        dummy=ListNode(0)
        f=dummy
        while temp:
            if temp.val<x:
                g.append(temp.val)
                f.next=ListNode(temp.val)
                f=f.next
            temp=temp.next
        while tempo:
            if tempo.val not in g:
                f.next=ListNode(tempo.val)
                f=f.next
            tempo=tempo.next
        return dummy.next
