function createJoltage(a: number, b: number): number {
  return Number.parseInt(`${a}${b}`, 10);
}

function findJoltage(batteryBank: number[]): number {
  let max = 0;
  for (let i = 0; i < batteryBank.length - 1; i++) {
    for (let j = i + 1; j < batteryBank.length; j++) {
      if (i === j) {
        continue;
      }
      const joltage = createJoltage(batteryBank[i], batteryBank[j]);
      if (joltage > max) {
        max = joltage;
      }
    }
  }
  return max;
}

const first = (input: string) => {
  const batteryBanks = input
    .split('\n')
    .map((line) => line.split('').map((v) => Number.parseInt(v, 10)));
  const joltages: number[] = [];
  for (const batteryBank of batteryBanks) {
    joltages.push(findJoltage(batteryBank));
  }

  return joltages.reduce((acc, joltage) => acc + joltage, 0);
};

const expectedFirstSolution = 357;

function findJoltage2(batteryBank: number[], depth = 12): number {
  if (depth === 1) {
    return Math.max(...batteryBank);
  }
  const splice = batteryBank.toSpliced(-(depth - 1));
  const max = Math.max(...splice);
  const index = splice.indexOf(max);
  const nextSplice = [...batteryBank].toSpliced(0, index + 1);
  const nestedJoltage = findJoltage2(nextSplice, depth - 1);
  return createJoltage(max, nestedJoltage);
}

const second = (input: string) => {
  const batteryBanks = input
    .split('\n')
    .map((line) => line.split('').map((v) => Number.parseInt(v, 10)));
  const joltages: number[] = [];
  for (const batteryBank of batteryBanks) {
    joltages.push(findJoltage2(batteryBank));
  }
  return joltages.reduce((acc, joltage) => acc + joltage, 0);
};

const expectedSecondSolution = 3121910778619;

export { expectedFirstSolution, expectedSecondSolution, first, second };
