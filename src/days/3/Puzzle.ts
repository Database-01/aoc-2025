function findJoltage(batteryBank: number[]): number {
  let max = 0;
  for (let i = 0; i < batteryBank.length - 1; i++) {
    for (let j = i + 1; j < batteryBank.length; j++) {
      if (i === j) {
        continue;
      }
      const joltage = Number.parseInt(`${batteryBank[i]}${batteryBank[j]}`, 10);
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

const second = (input: string) => {
  console.log(input);
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
