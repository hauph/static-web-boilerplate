export default class Graph {
  constructor(v) {
    this.vertices = v;
    this.adj = [];
    for (let i = 0; i < this.vertices; ++i) {
      this.adj[i] = [];
    }

    this.marked = [];
    for (let i = 0; i < this.vertices; ++i) {
      this.marked[i] = false;
    }

    this.edgeTo = [];
  }

  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
  }

  bfs(s, v) {
    var queue = [];
    this.marked[s] = true;
    queue.push(s);

    while (queue.length > 0) {
      var v = queue.shift();

      if (v !== undefined) {
        for (var i = 0; i < this.adj[v].length; i++) {
          var w = this.adj[v][i];

          if (!this.marked[w]) {
            this.edgeTo[w] = v;
            this.marked[w] = true;
            queue.push(w);
          }
        }
      }
    }

    return this.pathTo(s, v);
  }

  pathTo(source, v) {
    const path = [];

    if (!this.hasPathTo(v)) {
      return path;
    }

    for (let i = v; i !== source; i = this.edgeTo[i]) {
      path.push(i);
    }
    path.push(source);
    return path;
  }

  hasPathTo(v) {
    return this.marked[v];
  }

  showPath(paths, list) {
    let pathArr = [];

    while (paths.length > 0) {
      const output = `${list[paths.pop()]}`;
      pathArr.push(output);
    }

    return pathArr.join('\n');
  }
}
