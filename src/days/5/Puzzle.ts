type Range = { min: number; max: number };

function getFreshRanges(input: string): Range[] {
  return input.split('\n').map((value) => {
    const [min, max] = value.split('-');
    return { min: Number.parseInt(min, 10), max: Number.parseInt(max, 10) };
  });
}

function getIngredients(input: string): number[] {
  return input.split('\n').map((v) => Number.parseInt(v, 10));
}

const first = (input: string) => {
  const [rawRanges, rawIngredients] = input.split('\n\n');
  const freshRanges = getFreshRanges(rawRanges);
  const ingredients = getIngredients(rawIngredients);
  return ingredients.filter((i: number) =>
    freshRanges.some((range) => range.min <= i && range.max >= i)
  ).length;
};

const expectedFirstSolution = 3;

function rangeOverlap(a: Range, b: Range): boolean {
  return (
    (a.max >= b.min && a.max <= b.max) ||
    (a.min >= b.min && a.min <= b.min) ||
    (b.min >= a.min && b.min <= a.min) ||
    (b.max >= a.min && b.max <= a.max)
  );
}

const second = (input: string) => {
  const [rawRanges] = input.split('\n\n');
  const freshRanges = getFreshRanges(rawRanges).toSorted((a, b) =>
    a.min < b.min ? -1 : 1
  );
  const result = freshRanges.reduce((acc: Range[], range: Range) => {
    const lastRange = acc.at(-1);
    if (!lastRange) {
      return [range];
    }
    if (!rangeOverlap(lastRange, range)) {
      acc.push(range);
      return acc;
    }
    lastRange.min = Math.min(lastRange.min, range.min);
    lastRange.max = Math.max(lastRange.max, range.max);
    return acc;
  }, []);
  return result.reduce((acc, range) => {
    return acc + (range.max - range.min) + 1;
  }, 0);
};

const expectedSecondSolution = 14;

export { expectedFirstSolution, expectedSecondSolution, first, second };
