type Operation = '*' | '+';

const first = (input: string) => {
  const values = input.split('\n').map((line) =>
    line
      .replaceAll(/\s+/gim, ' ')
      .split(' ')
      .filter((v) => v !== '')
  );
  let result = 0;
  for (let i = 0; i < values[0].length; i++) {
    const operation = values.at(-1)![i] as Operation;
    let value = Number.parseInt(values[0][i], 10);
    for (let j = 1; j < values.length - 1; j++) {
      const indexValue = Number.parseInt(values[j][i], 10);
      if (operation === '*') {
        value *= indexValue;
      } else {
        value += indexValue;
      }
    }
    result += value;
  }
  return result;
};

const expectedFirstSolution = 4277556;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
