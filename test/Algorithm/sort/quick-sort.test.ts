import { IArray } from "@Interface/specific/IArray"
import { StaticArray } from "@DataStructure/array/static-array"
import { QuickSort } from "@Algorithm/sort/quick-sort";

describe(`#Test for Quick-Sort`, () => {

    const sa1: IArray<number> = new StaticArray<number>(12);
    const sa2: IArray<number> = new StaticArray<number>(12);

    beforeAll(() => {
        sa1
            .append(3)
            .append(10)
            .append(2)
            .append(9)
            .append(0)
            .append(11)
            .append(7)
            .append(5)
            .append(4)
            .append(6)
            .append(8)
            .append(1);
        sa2
            .append(1)
            .append(8)
            .append(6)
            .append(4)
            .append(5)
            .append(0)
            .append(7)
            .append(3)
            .append(9)
            .append(2)
            .append(10)
            .append(11);
    })

    it(`Test 1`, () => {
        QuickSort(sa1, 0, sa1.length - 1);
        sa1.print();
    })

    it(`Test 2`, () => {
        QuickSort(sa2, 0, sa2.length - 1);
        sa2.print();
    })

})