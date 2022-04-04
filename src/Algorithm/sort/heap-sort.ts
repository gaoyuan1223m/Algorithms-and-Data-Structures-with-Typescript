import { IArray } from "@Interface/specific/IArray";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";

export function HeapSort<T>(
  array: IArray<T>,
  left: number,
  right: number,
  compare: ICompareFunc<T> = valueTypeComparison
) {
  if (left >= right) return;

  let size = right - left + 1;

  // build in-place max heap
  function shiftDown(index: number) {
    const value = array[index]; // target value

    while (index < Math.floor(size / 2)) { // has child
        // It must have left node if having child
        let leftIndex = 2 * index + 1;
        let leftValue = array[leftIndex];

        let rightIndex = leftIndex + 1;
        let rightValue = array[rightIndex];

        // in case the right node is valid and it's large than the left
        // so the right won, and we should take it's index and corresponding value instead
        if (2 * index + 2 <= size - 1 && compare(rightValue).isLargerOrEqualTo(leftValue)) {
            leftIndex = rightIndex;
            leftValue = rightValue;
        }

        // if the larger value is also less then the target value,
        // which shows that max heap is ready
        if (compare(leftValue).isLessThan(value)) break;

        array[index] = leftValue;
        index = leftIndex;
    }

    array[index] = value;
  }

  const startPointer = left + (right - left) >> 1;
  for (let i = startPointer; i >= 0; i--) {
    shiftDown(i);
  }

  while (size > 1) {
    const temp = array[left];
    array[left] = array[size - 1];
    array[size - 1] = temp;

    size -= 1;

    shiftDown(left);
  }
}