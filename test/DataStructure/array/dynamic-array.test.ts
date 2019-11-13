import { DynamicArray } from "@DataStructure/array/dynamic-array";
import { IArray } from "@Interface/IArray";


describe(`Test for Dynamic Array`, () => {

    const dynamicArray: IArray<number> = new DynamicArray<number>(7);
    const seed: number[] = [7, 6, 8, 4, 11, 9, 15];

    beforeAll(() => {
        for (const [index, value] of seed.entries()) {
            dynamicArray.insert(value, index)
        }
    });

    it(`#Get size of the Dynamic Array`, () => {
        expect(dynamicArray.size).toBe(seed.length);
    });

    it(`#Get value by positive index`, () => {
        expect(dynamicArray.get(0)).toBe(7);
        expect(dynamicArray.get(6)).toBe(15);
    });

    it(`#Get value by negative index`, () => {
        expect(dynamicArray.get(-1)).toBe(15);
        expect(dynamicArray.get(-7)).toBe(7);
    });
});
