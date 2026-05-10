# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        c=0
        temp2=head
        temp=head
        while temp:
            c+=1
            temp=temp.next
        target=c-n
        x=0
        if target==0:
            return head.next
        while x<target-1:
            temp2=temp2.next
            x+=1
        temp2.next=temp2.next.next
        return head
