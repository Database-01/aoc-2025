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

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
