// http://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html
function MinHeap() {
    this.nodes = [];
}

MinHeap.prototype = {
    constructor: MinHeap,
    size: function() {
        var result = 0;
        for (var i = 0; i < this.nodes.length; ++i) {
            if (this.nodes[i]) {
                ++result;
            }
        }
        return result;
    },
    insert: function(value, key) {
        var insertIndex = 0;
        for (var i = 1; i < this.nodes.length; ++i) {
            if (this.nodes[i] === undefined) {
                insertIndex = i;
                break;
            }
        }
        if (insertIndex === 0) {
            insertIndex = this.nodes.length;
            this.nodes.length = this.nodes.length*2;
        }
        this.nodes[i] = {value: value, key: key};
        this.percolateUpwards(insertIndex);
    },
    decreaseKey: function(value, newKey) {
        var currentIndex = this.indexOf(value);
        var currentNode = this.nodes[currentIndex];
        if (currentNode.key <= newKey) {
            throw new Error("New key must be less than old key");
        }
        currentNode.key = newKey;
        this.percolateUpwards(currentIndex);
    },
    extractMin: function() {
        var minNode = this.nodes[1];
        if (minNode === undefined) {
            throw new Error("Empty heap");
        }
        this.nodes[1] = undefined;
        var i;
        for (i = this.nodes.length-1; i > 0; --i) {
            if (this.nodes[i] != undefined) {
                break;
            }
        }
        if (i > 1) {
            this.nodes[1] = this.nodes[i];
            this.nodes[i] = undefined;
            this.percolateDownwards(1);
        }
        return minNode;
    },
    percolateUpwards: function(i) {
        while (true) {
            var parentIndex = Math.floor(i/2);
            if (parentIndex === 0) {
                break;
            }
            var currentNode = this.nodes[i];
            var parentNode = this.nodes[parentIndex];
            if (currentNode.key > parentNode.key) {
                break;
            }
            this.nodes[i] = parentNode;
            this.nodes[parentIndex] = currentNode;
            i = parentIndex;
        }
    },
    percolateDownwards: function(i) {
        while (true) {
            var node = this.nodes[i];
            var leftNode = this.nodes[i*2];
            var rightNode = this.nodes[i*2+1];
            var next_i = i;
            if (leftNode && rightNode) {
                var j = leftNode.key < rightNode.key ? i*2 : i*2+1;
                if (this.nodes[j].key < node.key) {
                    next_i = j;
                }
            } else if (leftNode && leftNode.key < node.key) {
                next_i = i*2;
            } else if (rightNode && rightNode.key < node.key) {
                next_i = i*2+1;
            }
            if (i === next_i) {
                return;
            }
            this.nodes[i] = this.nodes[next_i];
            this.nodes[next_i] = node;
            i = next_i;
        }
    },
    obeysHeapProperty: function() {
        for (var i = 1; i < this.nodes.length; ++i) {
            var currentNode = this.nodes[i];
            var leftNode = this.nodes[2*i];
            var rightNode = this.nodes[2*i+1];
            if (leftNode && leftNode.key < currentNode.key) {
                return false;
            } else if (rightNode && rightNode.key < currentNode.key) {
                return false;
            }
        }
        return true;
    },
    indexOf: function(value) {
        for (var i = 1; i < this.nodes.length; ++i) {
            if (this.nodes[i] && this.nodes[i].value == value) {
                return i;
            }
        }
        throw new Error("Value is not in the heap");
    },
    peekMin: function() {
        var minNode = this.nodes[1];
        if (minNode === undefined) {
            throw new Error("Empty heap");
        }
        //
        // TODO: deep copy?
        //
        return minNode;
    }
};
