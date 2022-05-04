type RandomOpt = {
  min: number;
  max: number;
  from: number;
  to: number;
}

/**
 * 随机生成[min, max]之间的整数。默认[0,100]之间
 */
export function generateRandomNumber({ min = 0, max = 100 }: Partial<RandomOpt> = {}): number {
  if (min > max) {
    return NaN;
  }

  const range = max - min + 1;
  return Math.floor(Math.random() * range + min);
}

export function generateIncreasingArray(length: number, { min = 0, max = 100 }: Partial<RandomOpt> = {}): number[] {
  if (length <= 0 || min > max) {
    return [];
  }

  const step = (max - min) / (length - 1);
  return Array.from<number, number>({ length }, (_, index) => Math.floor(index * step) + min);
}

export function generateDecreasingArray(length: number, randomOpt: Partial<RandomOpt> = {}): number[] {
  return generateIncreasingArray(length, randomOpt).reverse();
}

/**
 * Fisher–Yates shuffle Algorithm, shuffling range is [from, to].
 */
function shuffle(array: number[], { from = 0, to = array.length - 1 }: Partial<RandomOpt> = {}) {
  if (from < 0) {
    from = 0;
  }

  if (to >= array.length) {
    to = array.length - 1;
  }

  for (let i = to; i > from; i--) {
    const rIdx = generateRandomNumber({ min: from, max: to });
    // [array[r], array[i]] = [array[i], array[r]]; // low efficiency
    const temp = array[i];
    array[i] = array[rIdx];
    array[rIdx] = temp;
  }
}

export function generatePartiallyIncreasingArray(
  length: number,
  {
    min = 0,
    max = 100,
    from = 0,
    to = length
  }: Partial<RandomOpt> = {},
): number[] {
  const array = generateIncreasingArray(length, { min, max });

  if (from > 0) {
    shuffle(array, { from: 0, to: from - 1 });
  }

  if (to < length) {
    shuffle(array, { from: to + 1, to: array.length - 1 })
  }

  return array;
}

export function generatePartiallyDecreasingArray(
  length: number,
  {
    min = 0,
    max = 100,
    from = 0,
    to = length
  }: Partial<RandomOpt> = {},
): number[] {
  const array = generateDecreasingArray(length, { min, max });

  if (from > 0) {
    shuffle(array, { from: 0, to: from - 1 });
  }

  if (to < length) {
    shuffle(array, { from: to + 1, to: array.length - 1 })
  }

  return array;
}
