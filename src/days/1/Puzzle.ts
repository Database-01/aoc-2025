type Action = { direction: 'L' | 'R'; count: number };
const POSITION_COUNT = 100;

function extractDirections(input: string): Action[] {
  const splitInput = input.split('\n');
  return splitInput.map((raw) => {
    const [direction, ...number] = raw;
    const parsedNumber = parseInt(number.join(''), 10);
    return { direction, count: parsedNumber } as Action;
  });
}

const first = (input: string) => {
  const directions = extractDirections(input);
  let position = 50;
  let zeroCount = 0;
  for (const { direction, count } of directions) {
    if (direction === 'L') {
      position -= count;
      while (position < 0) {
        position = POSITION_COUNT + position;
      }
    } else {
      position += count;
      while (position > POSITION_COUNT) {
        position = position - POSITION_COUNT;
      }
      if (position === POSITION_COUNT) {
        position = 0;
      }
      if (position > POSITION_COUNT) {
        position = position - POSITION_COUNT;
      }
    }
    if (position === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
};

class Node {
  public previous!: Node;
  public next!: Node;
  public visited = 0;
  public readonly index: number;
  constructor(index: number) {
    this.index = index;
  }

  visit() {
    this.visited++;
  }
}

const nodes = Array.from({ length: POSITION_COUNT }).map((_, index) => {
  return new Node(index);
});

for (const node of nodes) {
  if (node.index === 0) {
    node.previous = nodes.at(-1)!;
    node.next = nodes.at(1)!;
  } else if (node.index === 99) {
    node.previous = nodes.at(98)!;
    node.next = nodes.at(0)!;
  } else {
    node.previous = nodes.at(node.index - 1)!;
    node.next = nodes.at(node.index + 1)!;
  }
}

const expectedFirstSolution = 3;

const second = (input: string) => {
  const directions = extractDirections(input);
  let currentNode = nodes.at(49);

  for (const action of directions) {
    const step = (action.direction === 'L' ? -1 : 1) * action.count;
    for (let i = 0; i < Math.abs(step); i++) {
      if (action.direction === 'L') {
        currentNode = currentNode?.previous;
      } else {
        currentNode = currentNode?.next;
      }
      currentNode?.visit();
    }
  }

  return nodes.at(0)?.visited;
};

const expectedSecondSolution = 6;

export { expectedFirstSolution, expectedSecondSolution, first, second };
