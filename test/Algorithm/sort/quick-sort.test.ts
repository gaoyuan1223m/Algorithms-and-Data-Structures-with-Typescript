import { IArray } from "@Interface/specific";
import { ArrayFactory } from "@DataStructure/array";

describe(`#Test for Quick-Sort`, () => {

    const sa1: IArray<number> = ArrayFactory.create<number>(12);
    const sa2: IArray<number> = ArrayFactory.create<number>(12);

    beforeAll(() => {
        sa1
            .append(0)
            .append(10)
            .append(2)
            .append(9)
            .append(1)
            .append(11)
            .append(7)
            .append(5)
            .append(4)
            .append(6)
            .append(8)
            .append(3);
        sa2
            .append(11)
            .append(8)
            .append(6)
            .append(4)
            .append(5)
            .append(3)
            .append(7)
            .append(1)
            .append(9)
            .append(2)
            .append(10)
            .append(0);
    })

    it(`Test 1`, () => {
        sa1.sort().print();
        expect(sa1[-1]).toBe(sa1[sa1.length - 1]);
        expect(sa1[0]).toBe(sa1[0 - sa1.length]);
    })

    it(`Test 2`, () => {
        sa2.sort().print();
        expect(sa2[-1]).toBe(sa2[sa1.length - 1]);
        expect(sa2[0]).toBe(sa2[0 - sa1.length]);
    })

})