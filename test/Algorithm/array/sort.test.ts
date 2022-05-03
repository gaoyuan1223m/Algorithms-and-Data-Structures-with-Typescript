import {
  SortMethod,
  generatePartiallyIncreasingArray,
} from '@Algorithm/array';
import { inRed } from "@Utils/emphasize";

import { isSortedIncreasingly } from '../../Utils';

describe('Test All Sort Methods', () => {
  const length = 8000;
  const randomOpt = { min: 0, max: 20000, from: 7000, to: length };
  const originalDisorderedArray = generatePartiallyIncreasingArray(length, randomOpt);
  console.log(inRed(`🚦 Array, length: ${length}, is ordered from "${randomOpt.from}" to "${randomOpt.to}"`));

  it('compare sort methods', () => {
    const { array: orderedArrayByBubble, ...restByBubble } = SortMethod.useBubbleSort([...originalDisorderedArray]);
    const { array: orderedArrayBySelect, ...restBySelect } = SortMethod.useSelectSort([...originalDisorderedArray]);
    const { array: orderedArrayByInsert, ...restByInsert } = SortMethod.useInsertSort([...originalDisorderedArray]);
    const { array: orderedArrayByMerge, ...restByMerge } = SortMethod.useMergeSort([...originalDisorderedArray]);
    const { array: orderedArrayByQuick, ...restByQuick } = SortMethod.useQuickSort([...originalDisorderedArray]);

    console.table({
      bubble: restByBubble,
      select: restBySelect,
      insert: restByInsert,
      merge: restByMerge,
      quick: restByQuick,
      // ... TBC
    });

    expect(isSortedIncreasingly(orderedArrayByQuick)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByMerge)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByInsert)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayBySelect)).toBe(true);
    expect(isSortedIncreasingly(orderedArrayByBubble)).toBe(true);
  });
})