class Solution(object):
    def decodeMessage(self, key, message):
        """
        :type key: str
        :type message: str
        :rtype: str
        """
        ch = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        dic = {}
        ptr=0
        for s in key:
            if s == ' ' or s in dic: 
                continue
            dic[s] = ch[ptr]
            ptr += 1
        ans = ""
        for s in message:
            if s == ' ':
                ans += ' '
            else:
                ans += dic[s]
        return ans
