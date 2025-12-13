class Box {
  name: string;
  x: number;
  y: number;
  z: number;
  constructor(name: string, x: number, y: number, z: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }
}

type Connection = { link: Set<Box>; distance: number };

type Circuit = Set<Box>;

function calculateDistance(a: Box, b: Box): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const first = (input: string) => {
  const boxes: Box[] = input.split('\n').map((line, index) => {
    const [x, y, z]: [number, number, number] = line
      .split(',')
      .map((value) => Number.parseInt(value, 10)) as [number, number, number];
    return new Box(`Box ${index}`, x, y, z);
  });
  const connections: Connection[] = boxes
    .reduce((edges: Connection[], currentBox: Box, currentIndex: number) => {
      for (let i = currentIndex + 1; i < boxes.length; i++) {
        const nextBox = boxes[i];
        edges.push({
          link: new Set([currentBox, nextBox]),
          distance: calculateDistance(currentBox, nextBox),
        });
      }
      return edges;
    }, [])
    .toSorted((a, b) => a.distance - b.distance);
  const maxSize = boxes.length === 20 ? 10 : 1_000;
  const circuits: Set<Circuit> = new Set();
  let i = 0;

  while (i < maxSize) {
    const connection = connections[i];
    if (!connection) {
      break;
    }
    const existingCircuits = [...circuits.keys()].filter(
      (circuit) => !circuit.isDisjointFrom(connection.link)
    );

    switch (existingCircuits.length) {
      case 0:
        circuits.add(new Set([...connection.link]));
        break;
      case 1: {
        const [source, target] = [...connection.link] as [Box, Box];
        existingCircuits[0].add(source);
        existingCircuits[0].add(target);
        break;
      }
      case 2: {
        const mergedCircuit: Circuit = existingCircuits[0].union(
          existingCircuits[1]
        );
        existingCircuits.forEach((circuit) => {
          circuits.delete(circuit);
        });
        circuits.add(mergedCircuit);
      }
    }
    i++;
  }

  const [{ size: aSize }, { size: bSize }, { size: cSize }] = [
    ...circuits,
  ].sort((a, b) => b.size - a.size) as [
    Circuit,
    Circuit,
    Circuit,
    ...Circuit[],
  ];
  return aSize * bSize * cSize;
};

const expectedFirstSolution = 40;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
