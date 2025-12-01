type Action = { direction: 'L' | 'R'; count: number };

function extractDirections(input: string): Action[] {
  const splitedInput = input.split('\n');
  return splitedInput.map((raw) => {
    const [direction, ...number] = raw;
    let parsedNumber = parseInt(number.join(''), 10);
    while (parsedNumber > 100) {
      parsedNumber = parsedNumber - 100;
    }
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
        position = 100 + position;
      }
    } else {
      position += count;
      while (position > 100) {
        position = position - 100;
      }

      if (position === 100) {
        position = 0;
      }
      if (position > 100) {
        position = position - 100;
      }
    }
    if (position === 0) {
      zeroCount++;
    }
    console.log({ direction, count, position, zeroCount });
  }
  return zeroCount;
};

const expectedFirstSolution = 3;

const second = (input: string) => {
  // console.log(input);
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
