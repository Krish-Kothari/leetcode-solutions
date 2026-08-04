class Solution(object):
    def countAsterisks(self, s):
        """
        :type s: str
        :rtype: int
        """
        stack=[]
        for i in s: 
            if '|' not in stack: 
                stack.append(i) 
            elif '|' in stack and i=='|': 
                stack.pop()
        return stack.count('*')
