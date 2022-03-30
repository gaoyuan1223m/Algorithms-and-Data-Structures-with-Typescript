import { SortMethods } from "@Algorithm/sort/sort-methods";
import { ArrayFactory } from "@DataStructure/array"
import { ArrayTypes } from "@Utils/types";
import { valueTypeComparison } from "@Utils/compare";
import { IArray } from "@Interface/specific";

describe(`Test for Selection-sort`, () => {
    let array: IArray<number>;

    beforeAll(() => {
        const capacity = 8
        array = ArrayFactory.create(ArrayTypes.STATIC, valueTypeComparison, capacity);
        array
            .append(5)
            .append(7)
            .append(6)
            .append(3)
            .append(1)
            .append(7)
            .append(9)
            .append(10)
            .print();
    });

    it(`#sort increasingly`, () => {
        expect(array.sort(SortMethods.Selection).isInIncreasingOrder).toBe(true);

        array.print();
    });
})