import { ArrayFactory } from "@DataStructure/array"

describe(`Test for Dynamic Array`, () => {

    const initCapacity = 7;
    const da = ArrayFactory.create<number>(initCapacity, initCapacity);

    it(`#should return right size`, () => {
        expect(da.length).toBe(7);
        expect(da.size).toBe(0)
    })
})