import Graph from './graph';

export function riverCross(input, output) {
  const graph = new Graph(10);
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(2, 4);
  graph.addEdge(3, 5);
  graph.addEdge(4, 6);
  graph.addEdge(5, 7);
  graph.addEdge(6, 7);
  graph.addEdge(7, 8);
  graph.addEdge(8, 9);

  const moveSets = [
    'L L L L',
    'R L R L',
    'L L R L',
    'R L R R',
    'R R R L',
    'L L L R',
    'L R L L',
    'R R L R',
    'L R L R',
    'R R R R',
  ];

  const source = moveSets.indexOf(input);
  const target = moveSets.indexOf(output);

  const paths = graph.bfs(source, target);

  return graph.showPath(paths, moveSets);
}
