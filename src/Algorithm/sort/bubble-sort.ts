import { IArray } from "@Interface/specific/IArray";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";

export function BubbleSort<T>(
  arr: IArray<T>,
  left: number,
  right: number,
  compare: ICompareFunc<T> = valueTypeComparison
) {
  if (left >= right) return;

  const stopPointer = left;

  for (let end = right; end > stopPointer; end--) {
     // Assume array is in-ordered from pointerAtSorted to the end
    let pointerAtSorted = left + 1;

    for (let begin = left + 1; begin <= end; begin++) {
      if (compare(arr[begin]).isLessThan(arr[begin - 1])) {
        [arr[begin - 1], arr[begin]] = [arr[begin], arr[begin - 1]];
        pointerAtSorted = begin;
      }
    }

    end = pointerAtSorted;
  }
}

// function BubbleSort2<T>(
//   arr: IArray<T>,
//   left: number,
//   right: number,
//   compare: ICompareFunc<T> = valueTypeComparison
// ) {

//   if (left >= right) return;

//   const stopPointer = left;

//   for (let end = right; end > stopPointer; end--) {
//     let isSorted = true; // 默认当前数据有序

//     for (let begin = left + 1; begin <= end; begin++) {
//       if (compare(arr[begin]).isLessThan(arr[begin - 1])) {
//         [arr[begin - 1], arr[begin]] = [arr[begin], arr[begin - 1]];
//         isSorted = false; // 一旦发生交换，说明无序
//       }
//     }

//     if (isSorted) break;
//   }
// }