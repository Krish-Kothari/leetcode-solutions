class Solution(object):
    def scoreValidator(self, events):
        """
        :type events: List[str]
        :rtype: List[int]
        """
        score=0
        counter=0
        for i in events:
            if counter==10:
                break
            if i=="W":
                counter+=1
            elif i=="WD" or i=="NB":
                score+=1
            else:
                score+=int(i)
        return [score,counter]
