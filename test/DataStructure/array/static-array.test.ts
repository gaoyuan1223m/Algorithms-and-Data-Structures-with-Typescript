import { StaticArray } from "@DataStructure/array/static-array";
import { IArray } from "@Interface/specific/IArray";


describe(`Test for Static Array`, () => {

    const staticArray: IArray<number> = new StaticArray<number>(7);

    beforeAll(() => {
        staticArray
            .append(7)
            .append(6)
            .append(8)
            .append(4)
            .append(11)
            .append(9)
            .append(15)
    });

    it(`#Get size of the Static Array`, () => {
        expect(staticArray.size).toBe(7);
    });

    it(`#Get value by positive index`, () => {
        expect(staticArray[0]).toBe(7);
        expect(staticArray[6]).toBe(15);
        expect(staticArray[7]).toBe(undefined);
    });

    it(`#Get value by positive index`, () => {
        expect(staticArray[-1]).toBe(15);
        expect(staticArray[-7]).toBe(7);
        expect(staticArray[-8]).toBe(undefined);
    });

});
