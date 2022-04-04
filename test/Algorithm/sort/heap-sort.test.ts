import { SortMethods } from "@Algorithm/sort/sort-methods";
import { ArrayFactory } from "@DataStructure/array"
import { ArrayTypes } from "@Utils/types";
import { valueTypeComparison } from "@Utils/compare";
import { IArray } from "@Interface/specific";

describe(`Test for Heap-sort`, () => {
    let array: IArray<number>;

    beforeAll(() => {
        const capacity = 8
        array = ArrayFactory.create(ArrayTypes.STATIC, valueTypeComparison, capacity);
        array
            .append(5)
            .append(7)
            .append(6)
            .append(3)
            .append(10)
            .append(7)
            .append(9)
            .append(1)
            .print();
    });

    it(`#sort increasingly`, () => {
        array
            .sort(SortMethods.HEAP)
            .print();

        expect(array.isInIncreasingOrder).toBe(true);
    });
})