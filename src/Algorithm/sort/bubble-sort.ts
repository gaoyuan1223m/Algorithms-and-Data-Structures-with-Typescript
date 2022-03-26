import { IArray } from "@Interface/specific/IArray";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";
import { SortType } from '@Algorithm/sort/sort-methods';

export function BubbleSort<T>(
  arr: IArray<T>,
  left: number,
  right: number,
  compare: ICompareFunc<T> = valueTypeComparison
) {

  if (left >= right) return;

  const stopPointer = left;

  for (let end = right; end > stopPointer; end--) {
    let isSorted = true;

    for (let begin = left + 1; begin <= end; begin++) {
      if (compare(arr[begin]).isLessThan(arr[begin - 1])) {
        [arr[begin - 1], arr[begin]] = [arr[begin], arr[begin - 1]];
        isSorted = false;
      }
    }

    if (isSorted) break;
  }
}