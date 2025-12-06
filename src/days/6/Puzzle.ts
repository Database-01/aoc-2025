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
  const [rawOperations, ...rawValues] = input.split('\n').toReversed();
  const operations = rawOperations
    .replaceAll(/\s+/gim, ' ')
    .split(' ')
    .toReversed() as Operation[];
  const maxValueLength = Math.max(...rawValues.map((v) => v.length));
  const values = rawValues.map((v) =>
    [...v.padEnd(maxValueLength, ' ')].toReversed()
  );
  const final = values[0]
    .map((v, index) => values.map((row) => row[index]).reverse())
    .map((row) => row.join(''))
    .map((row) => {
      if (/^\s+$/.test(row)) {
        return '';
      }
      return Number.parseInt(row, 10);
    })
    .reduce((acc: number[][], value: number | '', index: number) => {
      if (index === 0) {
        return [[value as number]];
      }
      if (typeof value === 'number') {
        acc.at(-1)!.push(value);
      } else {
        acc.push([]);
      }
      return acc;
    }, []);
  return operations.reduce((acc: number, operation: Operation, index) => {
    const problemResult = eval(final[index].join(operation));
    return acc + problemResult;
  }, 0);
};

const expectedSecondSolution = 3263827;

export { expectedFirstSolution, expectedSecondSolution, first, second };
