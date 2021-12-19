
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;

class Solution {

    Set<Integer>[] adjacencyList;

    public List<Integer> findMinHeightTrees(int numberOfNodes, int[][] edges) {

        fill_adjList(numberOfNodes, edges);
        return breadthFirstSearch(numberOfNodes, edges);
    }

    public List<Integer> breadthFirstSearch(int numberOfNodes, int[][] edges) {

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numberOfNodes; i++) {
            if (adjacencyList[i].size() == 1) {
                queue.add(i);//Initialize queue wth all leaf nodes.
            }
        }

        while (numberOfNodes > 2) {

            int size = queue.size();
            numberOfNodes -= size;

            //In each round: remove leaf nodes, then add the newly formed leaf nodes that result from the remova.
            while (size-- > 0) {

                int current = queue.poll();
                int neighbour = adjacencyList[current].iterator().next();
                adjacencyList[neighbour].remove(current);
                adjacencyList[current].clear();

                if (adjacencyList[neighbour].size() == 1) {
                    queue.offer(neighbour);
                }
            }
        }

        /*
        The last node(s) in the queue(one or two nodes, depending on the tree configuration), 
        are root(s) with the minimum height of the given tree.
         */
        return queue.size() > 0 ? new ArrayList<>(queue) : new ArrayList<>(Arrays.asList(0));
    }

    //Add edges in an undirected graph.
    public void fill_adjList(int numberOfNodes, int[][] edges) {

        adjacencyList = new Set[numberOfNodes];
        for (int i = 0; i < numberOfNodes; i++) {
            adjacencyList[i] = new HashSet<>();
        }

        int size = edges.length;
        for (int i = 0; i < size; i++) {
            adjacencyList[edges[i][0]].add(edges[i][1]);
            adjacencyList[edges[i][1]].add(edges[i][0]);
        }
    }
}
