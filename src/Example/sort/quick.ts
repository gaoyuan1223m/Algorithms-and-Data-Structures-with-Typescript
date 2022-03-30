const quickSort = (array: number[]): number[] => {

  if (array.length <= 1) return array; //Recrursion Base

  const middle = Math.floor(array.length / 2);

  const pivot = array[middle];

  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < array.length; i++) {
    if (i === middle) continue;

    array[i] <= pivot ? left.push(array[i]) : right.push(array[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}