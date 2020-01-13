import { ArrayFactory } from "@DataStructure/array"
import { ArrayTypes } from "@Utils/types";

describe(`Test for Dynamic Array`, () => {

    const initCapacity = 7;
    const dynamicArray = new ArrayFactory(initCapacity).create<number>(ArrayTypes.Dynamic);

    it(`#should return right size`, () => {
        expect(dynamicArray.length).toBe(7);
        expect(dynamicArray.size).toBe(0)
    });
});