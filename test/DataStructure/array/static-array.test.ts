import { StaticArray } from "@DataStructure/array/static-array";
import { IArray } from "@Interface/specific/IArray";


describe(`Test for Static Array`, () => {

    const staticArray: IArray<number> = new StaticArray<number>(7);

    beforeAll(() => {
        staticArray
            .append(7)
            .insertByIndex(6, 3)
            .insertByIndex(2, 5)
            .insertByIndex(16, 3)
            .updateByIndex(26, 4)
    });

    it(`#Get size/length of the array`, () => {
        expect(staticArray.size).toBe(4);
        expect(staticArray.length).toBe(7);
    });

    it(`#Get value by positive index`, () => {
        expect(staticArray[3]).toBe(16);
        expect(staticArray[4]).toBe(26);
        expect(staticArray[5]).toBe(2);
    });

    it(`#Get value by negative index`, () => {
        expect(staticArray[-4]).toBe(16);
        expect(staticArray[-3]).toBe(26);
        expect(staticArray[-2]).toBe(2);
    });

});
