class Solution(object):
    def countMatches(self, items, ruleKey, ruleValue):
        """
        :type items: List[List[str]]
        :type ruleKey: str
        :type ruleValue: str
        :rtype: int
        """
        if ruleKey=="type":
            x=0
        elif ruleKey=="color":
            x=1
        else:
            x=2
        c=0
        for i in items:
            if i[x]==ruleValue:
                c+=1
        return c
