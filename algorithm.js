function Algorithm(G, P, Q) {
    this.G = G;
    this.P = P;
    this.Q = Q;
    this.dist = [];
    this.dist[P] = 0;
    this.previous = [];

    this.A = {}
    this.B = new MinHeap();

    for (var v = 0; v < G.length; ++v) {
        if (v != P) {
            this.dist[v] = Number.POSITIVE_INFINITY;
        }
        this.B.insert(v, this.dist[v]);
    }

    this.JT = undefined;
    this.neighbors = undefined;
    this.R = undefined;
    this.currentNeighbor = undefined;
    this.complete = false;
}

Algorithm.prototype = {
    constructor: Algorithm,
    step: function() {
        if (this.complete) {
            return true;
        }
        if (this.JT === undefined) {
            if (this.B.size() === 0 || this.B.peekMin().key === Number.POSITIVE_INFINITY || this.B.peekMin().value === this.Q) {
                this.complete = true;
                return true;
            }
            this.JT = this.B.extractMin().value;
            this.A[this.JT] = true;
            this.neighbors = undefined;
            this.R = undefined;
            this.currentNeighbor = undefined;
            return false;
        }

        if (this.neighbors === undefined) {
            this.neighbors = [];
            for (var R = 0; R < this.G.length; ++R) {
                if (R in this.A || R === this.JT || this.G[this.JT][R] == Number.POSITIVE_INFINITY) {
                    continue;
                }
                this.neighbors.push(R);
            }
            return false;
        }
        if (this.currentNeighbor === undefined) {
            this.currentNeighbor = 0;
        } else {
            this.currentNeighbor += 1;
        }
        if (this.currentNeighbor === this.neighbors.length) {
            this.JT = undefined;
            this.neighbors = undefined;
            return false;
        }

        this.R = this.neighbors[this.currentNeighbor];
        var alt = this.dist[this.JT] + this.G[this.JT][this.R];
        if (alt < this.dist[this.R]) {
            this.dist[this.R] = alt;
            this.previous[this.R] = this.JT;
            this.B.decreaseKey(this.R, alt);
        }

        return false;
    },
    shortestPath: function() {
        var nodes = [];
        var edges = [];
        if (this.dist[this.Q] != Number.POSITIVE_INFINITY) {
            var tmpNode = this.Q;
            nodes.push(tmpNode);
            while (true) {
                var prevNode = this.previous[tmpNode];
                edges.push({src: tmpNode, dst: prevNode});

                tmpNode = prevNode;
                nodes.push(prevNode);
                if (tmpNode == this.P) {
                    break;
                }
            }
        }
        return {edges: edges, nodes: nodes, distance: this.dist[this.Q]}
    }
};
