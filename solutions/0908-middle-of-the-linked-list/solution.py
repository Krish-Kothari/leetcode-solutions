# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        c=0
        temp=head
        temp2=head
        while temp:
            c+=1
            temp=temp.next
        c//=2
        x=0
        while x<c:
            temp2=temp2.next
            x+=1
        return temp2
