import { IArray } from "@Interface/specific/IArray";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";

export function InsertionSort<T>(
  arr: IArray<T>,
  left: number,
  right: number,
  compare: ICompareFunc<T> = valueTypeComparison
) {
  if (left >= right) return;

  for (let begin = left + 1; begin <= right; begin++) {

    let starter = begin;
    const temp = arr[begin];

    while (starter > left && compare(temp).isLessThan(arr[starter - 1])) {
        arr[starter] = arr[starter - 1];
        starter--;
    }

    arr[starter] = temp;
  }
}