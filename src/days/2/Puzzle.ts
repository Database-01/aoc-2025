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
  return invalidIds.reduce((acc, value) => acc + value, 0);
};

const expectedFirstSolution = 1227775554;

function hasBackReference2(value: number): boolean {
  const stringValue = value.toString();
  return /^(\d+)\1+$/.test(stringValue);
}

const second = (input: string) => {
  const ranges = extractRanges(input);
  const invalidIds: number[] = [];
  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i += 1) {
      if (hasBackReference2(i)) {
        invalidIds.push(i);
      }
    }
  }
  return invalidIds.reduce((acc, value) => acc + value, 0);
};

const expectedSecondSolution = 4174379265;

export { expectedFirstSolution, expectedSecondSolution, first, second };
