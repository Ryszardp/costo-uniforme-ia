function makeSymmetric (matrix) {
  for (var i = 0; i < matrix.length; ++i) {
    for (var j = 0; j < i; ++j) {
      g[i][j] = g[j][i]
    }
  }
}

function createMatrix (numNodes) {
  var g = []
  for (var i = 0; i < numNodes; ++i) {
    g[i] = []
    for (var j = 0; j < numNodes; ++j) {
      g[i][j] = Number.POSITIVE_INFINITY
    }
    g[i][i] = 0
  }
  return g
}

function createGraphExample () {
  g = createMatrix(10)
  g[0][1] = 7
  g[0][2] = 7
  g[2][3] = 2
  g[4][5] = 3
  g[5][6] = 7
  g[4][7] = 2
  g[3][4] = 5
  g[2][8] = 6
  g[1][9] = 5
  makeSymmetric(g)
  return g
}

function createRandomGraph (numNodes, edgeProbability, maxWeight) {
  var g = []
  for (var a = 0; a < numNodes; ++a) {
    g[a] = []
  }
  for (var i = 0; i < numNodes; ++i) {
    for (var j = i + 1; j < numNodes; ++j) {
      var randomNumber = Math.random()
      var length = Number.POSITIVE_INFINITY
      if (randomNumber > edgeProbability) {
        length = Math.floor(Math.random() * maxWeight)
      }
      g[i][j] = g[j][i] = length
    }
  }
  return g
}
