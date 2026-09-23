# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        ans=[]
        for i in lists:
            while i:
                ans.append(i.val)
                i=i.next
        ans.sort()
        head=ListNode(0)
        temp=head
        for i in ans:
            temp.next=ListNode(i)
            temp=temp.next
        return head.next
