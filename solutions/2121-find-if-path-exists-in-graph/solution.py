from collections import deque
class Solution:
    def validPath(self, n: int, edges: list[list[int]], source: int, destination: int) -> bool:
        adjList=[[] for _ in range(n)]
        for x,y in edges:
            adjList[x].append(y)
            adjList[y].append(x)
        visited=[False]*n
        ans=deque([source])
        visited[source]=True
        while ans:
            node=ans.popleft()
            if node==destination:
                return True
            for neigh in adjList[node]:
                if not visited[neigh]:
                    visited[neigh]=True
                    ans.append(neigh)
        return False
