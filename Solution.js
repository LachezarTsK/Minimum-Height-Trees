
/**
 * @param {number} numberOfNodes
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (numberOfNodes, edges) {
    const nodesMinHeight = new NodesMinHeight(numberOfNodes, edges);
    return nodesMinHeight.findMinHeightTrees();
};

class NodesMinHeight {

    constructor(numberOfNodes, edges) {
        this.numberOfNodes = numberOfNodes;
        this.edges = edges;
        this.adjacencyList = [];
    }

    findMinHeightTrees() {
        this.fill_adjList(this.numberOfNodes, this.edges);
        return this.breadthFirstSearch(this.numberOfNodes, this.edges);
    }

    breadthFirstSearch() {
        const queue = [];
        for (let i = 0; i < this.numberOfNodes; i++) {

            if (this.adjacencyList[i].size === 1) {
                queue.push(i);//Initialize queue with all leaf nodes.               
            }
        }


        while (this.numberOfNodes > 2) {

            let size = queue.length;
            this.numberOfNodes -= size;


            //In each round: remove leaf nodes, then add the newly formed leaf nodes that result from the removal.
            while (size-- > 0) {

                let current = queue.shift();
                let neighbour = this.adjacencyList[current].values().next().value;


                this.adjacencyList[neighbour].delete(current);
                this.adjacencyList[current].clear();

                if (this.adjacencyList[neighbour].size === 1) {
                    queue.push(neighbour);
                }
            }
        }

        /*
         The last node(s) in the queue(one or two nodes, depending on the tree configuration), 
         are root(s) with the minimum height of the given tree.
         */
        return queue.length > 0 ? queue : [0];
    }

    //Add edges in an undirected graph.
    fill_adjList() {

        for (let i = 0; i < this.numberOfNodes; i++) {
            this.adjacencyList[i] = new Set();
        }

        let size = this.edges.length;
        for (let i = 0; i < size; i++) {
            this.adjacencyList[this.edges[i][0]].add(this.edges[i][1]);
            this.adjacencyList[this.edges[i][1]].add(this.edges[i][0]);
        }
    }
}
