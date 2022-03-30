import { IArray } from "@Interface/specific/IArray";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";


export function SelectionSort<T>(
  arr: IArray<T>,
  left: number,
  right: number,
  compare: ICompareFunc<T> = valueTypeComparison
) {
  if (left >= right) return;

  for (let end = right; end > left; end--) {
    let idxOfMax = left;

    for (let begin = left + 1; begin <= end; begin++) {
      if (compare(arr[idxOfMax]).isLessOrEqualTo(arr[begin])) {
        idxOfMax = begin;
      }
    }

    [arr[idxOfMax], arr[end]] = [arr[end], arr[idxOfMax]];
  }
}