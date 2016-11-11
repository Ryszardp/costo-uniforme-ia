
function Algorithm (G, P, Q) {
  // Grafo
  this.G = G
  // Nodo inicial
  this.P = P
  // Nodo final
  this.Q = Q
  // Costo de cada nodo
  this.dist = []
  // Costo de nodo raíz
  this.dist[P] = 0
  // Nodo previo
  this.previous = []
  // Objeto con los nodos marcados como visitados
  this.A = {}
  // Objeto que nos permitira el ordenamiento de los nodos
  this.B = new MinHeap()
  for (var v = 0; v < G.length; ++v) {
    (v !== P)
    ? this.dist[v] = Number.POSITIVE_INFINITY
    : this.dist[v]
    this.B.insert(v, this.dist[v])
  }
  // Nodo padre
  this.PN = undefined
  // Numero de nodos del padre
  this.neighbors = undefined
  // Ultimo nodo abierto
  this.R = undefined
  // Nodo hijo actual
  this.currentNeighbor = undefined
  // Falso mientras no se encuentre el nodo objetivo
  this.complete = false
}

Algorithm.prototype = {
  constructor: Algorithm,
  // Función de cada paso del algoritmo
  step: function () {
    if (this.complete) {
      return true
    }
    // Asignación de nodo padre
    if (this.PN === undefined) {
      /* Validación del nodo que su costo no sea 0,
       valor infinito o sea un estado objetivo. */
      if (this.B.size() === 0 ||
          this.B.peekMin().key === Number.POSITIVE_INFINITY ||
          this.B.peekMin().value === this.Q
      ) {
        // Si alguna se cumple el estado de busqueda finaliza
        this.complete = true
        return true
      }
      // Se asigna el nodo con menor costo
      this.PN = this.B.extractMin().value
      // Marcar nodo padre como visitado
      this.A[this.PN] = true
      // Valor numero de nodos del padre sin definir
      this.neighbors = undefined
      // Ultimo nodo abierto no definido
      this.R = undefined
      // Nodos hijo actual no definido
      this.currentNeighbor = undefined
      // La busqueda debe continuar
      return false
    }
    if (this.neighbors === undefined) {
      // Creación de numero de nodos hijos
      this.neighbors = []
      // Validación que el nodo sea correcto
      for (var R = 0; R < this.G.length; ++R) {
        if (R in this.A || R === this.PN ||
          this.G[this.PN][R] === Number.POSITIVE_INFINITY
        ) {
          continue
        }
        // Agregamos los nodos hijos
        this.neighbors.push(R)
      }
      // Grafo aún no finalizado
      return false
    }
    // visitar todos los nodos hijos
    (this.currentNeighbor === undefined)
    // no esta definido se asigna el nodo 0
    ? this.currentNeighbor = 0
    // es distinto se agrega 1
    : this.currentNeighbor += 1
    // En caso de que nodo hijo sea ultimo
    if (this.currentNeighbor === this.neighbors.length) {
      // Nodo padre igual a no definido
      this.PN = undefined
      // nodos padre no definido
      this.neighbors = undefined
      // Estado aún no finalizado
      return false
    }
    // Se asigna nodo abierto
    this.R = this.neighbors[this.currentNeighbor]
    // Se calcula el costo del nodo padre al nodo hijo visitado
    var alt = this.dist[this.PN] + this.G[this.PN][this.R]
    // Validación que el nodo sea el de menor costo
    if (alt < this.dist[this.R]) {
      this.dist[this.R] = alt
      this.previous[this.R] = this.PN
      this.B.decreaseKey(this.R, alt)
    }
    // Estado del grafo aún sin terminar
    return false
  },
  // Función para encontrar el camino mas corto
  shortestPath: function () {
    var nodes = []
    var edges = []
    // Si nodo el valor del nodo final es distinto a infinito
    if (this.dist[this.Q] !== Number.POSITIVE_INFINITY) {
      var tmpNode = this.Q
      nodes.push(tmpNode)
      while (true) {
        // Recorremos del nodo objetivo al nodo raíz
        var prevNode = this.previous[tmpNode]
        edges.push({src: tmpNode, dst: prevNode})
        tmpNode = prevNode
        nodes.push(prevNode)
        if (tmpNode === this.P) {
          // si el nodo actual es nodo raíz finalizar while
          break
        }
      }
    }
    // Regresamos todas las aristas y los nodos asi como la distancia
    return {edges: edges, nodes: nodes, distance: this.dist[this.Q]}
  }
}
