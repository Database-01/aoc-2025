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
  const [sourceRow, ...map] = input
    .split('\n')
    .map((v) => v.split('')) as Location[][];
  const sourceIndex = sourceRow.indexOf('S');
  const result = map[0].map(() => 0);
  result[sourceIndex] = 1;
  for (let i = 1; i < map.length; i++) {
    map[i].forEach((element, index) => {
      if (element === '^') {
        if (index > 0) {
          result[index - 1] += result[index];
        }
        if (index < map[0].length - 1) {
          result[index + 1] += result[index];
        }
        result[index] = 0;
      }
    });
  }
  return result.reduce((a, b) => a + b, 0);
};

const expectedSecondSolution = 40;

export { expectedFirstSolution, expectedSecondSolution, first, second };
