import { SortMethod, generatePartiallyIncreasingArray } from '@Algorithm/array';
import { inRed } from "@Utils/emphasize";
import { isSortedIncreasingly } from '../../Utils';

describe('Test All Sort Methods', () => {
  it('1. len: 5000, partially ordered from "0" to the "1000"', () => {
    const length = 30000;
    const randomOpt = { min: 0, max: 100000, from: 0, to: 2000 };
    const originalDisorderedArray = generatePartiallyIncreasingArray(length, randomOpt);
    console.log(inRed(`🚦 Array, length: ${length}, is ordered from "${randomOpt.from}" to "${randomOpt.to}"`));

    const { array: orderedArrayByBubble, ...restByBubble } = SortMethod.useBubbleSort([...originalDisorderedArray]);
    const { array: orderedArrayBySelect, ...restBySelect } = SortMethod.useSelectSort([...originalDisorderedArray]);
    const { array: orderedArrayByInsert, ...restByInsert } = SortMethod.useInsertSort([...originalDisorderedArray]);
    const { array: orderedArrayByMerge, ...restByMerge } = SortMethod.useMergeSort([...originalDisorderedArray]);
    const { array: orderedArrayByQuick, ...restByQuick } = SortMethod.useQuickSort([...originalDisorderedArray]);
    const { array: orderedArrayByHeap, ...restByHeap } = SortMethod.useHeapSort([...originalDisorderedArray]);

    console.table({
      bubble: restByBubble,
      select: restBySelect,
      insert: restByInsert,
      merge: restByMerge,
      quick: restByQuick,
      heap: restByHeap,
      // ... TBC
    });

    expect(isSortedIncreasingly(orderedArrayByQuick)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByMerge)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByInsert)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayBySelect)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByBubble)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByHeap)).toBe(true);
  });
})