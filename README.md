# Implement both Prim's and Kruskal's greedy algorithms for finding a minimum-spanning tree in a weighted undirected graph.

- Refamiliarize yourself with induction
- Figure out Prim's
- Implement Prim's
- refamiliarize yourself with Kruskal's
- implement Kruskal's
- design an adjacency list using an object in 
- produce graphs of different sizes
    -different number of cities
    - different number of paths 
    - different number of lengths (is this significant)
- prims': random vertex selection
- figure out where in prims do we design a recursive(or iterative implemenation?)

- prims 
    - struggling to get MST to add additional shortest paths
    - struggling to recalculate shortest-len after the 1st calculate
    - syntax for checking off both sub-paths is too local
    - i don't see syntax for selecting the following vertex

- supposed to
    - create a mst
    - initialize it with a starting vertex
    - find the vertex closest to startingvertex, name it shortest-path-city
    - add shortest-path-city to the mst
    - find the next vertex closest to the entire vertex

- a lot of our prims errors hinge directly on the fact we aren't generating an updated shortest length 
- which dominoes back to the fact the 
- what to do with that extra first city? after the 1st case?
