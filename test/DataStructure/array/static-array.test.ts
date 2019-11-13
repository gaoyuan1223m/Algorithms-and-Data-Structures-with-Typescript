import { StaticArray } from "@DataStructure/array/static-array";
import { IArray } from "@Interface/IArray";


describe(`Test for Dynamic Array`, () => {

    const staticArray: IArray<number> = new StaticArray<number>(7);


    beforeAll(() => {
        staticArray.insert(34);
        staticArray.insert(55);
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
