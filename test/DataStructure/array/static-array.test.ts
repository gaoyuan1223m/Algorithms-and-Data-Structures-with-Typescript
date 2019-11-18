import { StaticArray } from "@DataStructure/array/static-array";
import { IArray } from "@Interface/specific/IArray";


describe(`Test for Dynamic Array`, () => {

    const staticArray: IArray<number> = new StaticArray<number>(7);


    beforeAll(() => {
        staticArray
            .append(34)
            .append(55)
    });

    it(`#Get size of the Dynamic Array`, () => {
        expect(staticArray.size).toBe(2);
    });

    it(`#Get value by positive index`, () => {
        expect(staticArray[0]).toBe(34);
        expect(staticArray[1]).toBe(55);
        expect(staticArray[2]).toBe(undefined);
    });

});
