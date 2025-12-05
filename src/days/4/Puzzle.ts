const LocationType = {
  EMPTY: '.',
  PAPER: '@',
} as const;

type Location = (typeof LocationType)[keyof typeof LocationType];
type Movement = { x: 1 | -1 | 0; y: 1 | -1 | 0 };
type Directions = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const Movements = {
  N: { x: -1, y: 0 },
  NE: { x: -1, y: 1 },
  E: { x: 0, y: 1 },
  SE: { x: 1, y: 1 },
  S: { x: 1, y: 0 },
  SW: { x: 1, y: -1 },
  W: { x: 0, y: -1 },
  NW: { x: -1, y: -1 },
} satisfies Record<Directions, Movement>;

function createMap(input: string): Location[][] {
  return input.split('\n').map((line) => line.split('') as Location[]);
}

const first = (input: string) => {
  function checkPosition(x: number, y: number): boolean {
    if (map[x][y] === LocationType.EMPTY) {
      return false;
    }
    const adjcents = Object.values(Movements)
      .map((movement: Movement) => {
        return map[x + movement.x]?.[y + movement.y] ?? '.';
      })
      .filter((location) => location === LocationType.PAPER);
    return adjcents.length < 4;
  }

  const map = createMap(input);
  const width = map[0].length;
  const height = map.length;
  let result = 0;
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      if (checkPosition(x, y)) {
        result++;
      }
    }
  }
  return result;
};

const expectedFirstSolution = 13;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
