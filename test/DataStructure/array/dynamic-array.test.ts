import { DynamicArray } from "@DataStructure/array/dynamic-array";
import { IArray } from "@Interface/specific/IArray";


describe(`Test for Dynamic Array`, () => {

    const dynamicArray: IArray<number> = new DynamicArray<number>(7);

    beforeAll(() => {
        dynamicArray
            .append(7)
            .append(6)
            .append(8)
            .append(4)
            .append(11)
            .append(9)
            .append(15)
    });

    it(`#Get size of the Dynamic Array`, () => {
        expect(dynamicArray.size).toBe(7);
    });

    it(`#Get value by positive index`, () => {
        expect(dynamicArray[0]).toBe(7);
        expect(dynamicArray[6]).toBe(15);
    });

    it(`#Get value by negative index`, () => {
        expect(dynamicArray[-1]).toBe(15);
        expect(dynamicArray[-7]).toBe(7);
    });
});
