type Ranges = {
  start: number;
  end: number;
};

function extractRanges(input: string): Ranges[] {
  return input.split(',').map((a) => {
    const [start, end] = a.split('-');
    return { start: Number.parseInt(start, 10), end: Number.parseInt(end, 10) };
  });
}

function hasBackReference(value: number): boolean {
  const stringValue = value.toString();
  if (stringValue.length % 2 !== 0) {
    return false;
  }
  const middle = stringValue.length / 2;
  return new RegExp(String.raw`(^(?!0)[0-9]{${middle}})+\1`).test(stringValue);
}

const first = (input: string) => {
  const ranges = extractRanges(input);
  const invalidIds: number[] = [];
  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i += 1) {
      if (hasBackReference(i)) {
        invalidIds.push(i);
      }
    }
  }
  console.log(invalidIds);
  return invalidIds.reduce((acc, value) => acc + value, 0);
};

const expectedFirstSolution = 1227775554;

const second = (input: string) => {
  console.log(input);
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
