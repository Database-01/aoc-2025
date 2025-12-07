type Location = 'S' | '.' | '^' | '|';

const first = (input: string) => {
  const [sourceRow, ...map] = input
    .split('\n')
    .map((v) => v.split('')) as Location[][];
  const sourceIndex = sourceRow.indexOf('S');
  const splits = new Set<string>([]);
  const indices: Set<number> = new Set([sourceIndex]);
  for (let i = 0; i < map.length; i++) {
    for (const index of indices) {
      if (map[i][index] === '^') {
        splits.add(`x:${i};y:${index}`);
        indices.delete(index);
        if (index + 1 < map[i].length) {
          indices.add(index + 1);
          map[i][index + 1] = '|';
        }
        if (index > 0) {
          indices.add(index - 1);
          map[i][index - 1] = '|';
        }
      } else {
        map[i][index] = '|';
      }
    }
  }
  return splits.size;
};

const expectedFirstSolution = 21;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
