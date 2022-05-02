/**
 * whether [from, to) part of the array is increasingly sorted.
 */
export function isSortedIncreasingly(array: number[], from = 0 , to = array.length): boolean {
  if (from < 0) {
    from = 0;
  }

  if (to > array.length) {
    to = array.length;
  }

  for (let i = from + 1; i < to; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }

  return true;
}

/**
 * whether [from, to) part of the array is decreasingly sorted.
 */
export function isSortedDecreasingly(array: number[], from = 0, to = array.length): boolean {
  if (from < 0) {
    from = 0;
  }

  if (to > array.length) {
    to = array.length;
  }

  for (let i = from + 1; i < to; i++) {
    if (array[i] > array[i - 1]) {
      return false;
    }
  }

  return true;
}