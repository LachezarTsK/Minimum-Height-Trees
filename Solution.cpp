
#include <vector>
#include <set>
#include <array>
#include <queue>

using namespace std;

class Solution {

public:
	vector<set<int>> adjacencyList;

	vector<int> findMinHeightTrees(int numberOfNodes, vector<vector<int>>& edges) {
		fill_adjList(numberOfNodes, edges);
		return breadthFirstSearch(numberOfNodes, edges);
	}

	vector<int>  breadthFirstSearch(int numberOfNodes, vector<vector<int>>& edges) {

		queue<int> queue;
		for (int i = 0; i < numberOfNodes; i++) {
			if (adjacencyList[i].size() == 1) {
				queue.push(i);//Initialize queue with all leaf nodes.
			}
		}

		while (numberOfNodes > 2) {

			int size = queue.size();
			numberOfNodes -= size;

			//In each round: remove leaf nodes, then add the newly formed leaf nodes that result from the removal.
			while (size-- > 0) {

				int current = queue.front();
				queue.pop();
				int neighbour = (*adjacencyList[current].begin());
				adjacencyList[neighbour].erase(current);
				adjacencyList[current].clear();

				if (adjacencyList[neighbour].size() == 1) {
					queue.push(neighbour);
				}
			}
		}


		/*
		 The last node(s) in the queue(one or two nodes, depending on the tree configuration),
		 are root(s) with the minimum height of the given tree.
		*/
		vector<int> result;
		while (queue.size() > 0) {
			result.push_back(queue.front());
			queue.pop();
		}
		return result.size() > 0 ? result : vector<int>{ 0 };
	}

	//Add edges in an undirected graph.
	void fill_adjList(int numberOfNodes, vector<vector<int>>& edges) {

		for (int i = 0; i < numberOfNodes; i++) {
			adjacencyList.push_back(set<int>());
		}

		int size = edges.size();
		for (int i = 0; i < size; i++) {
			adjacencyList[edges[i][0]].insert(edges[i][1]);
			adjacencyList[edges[i][1]].insert(edges[i][0]);
		}
	}
};
