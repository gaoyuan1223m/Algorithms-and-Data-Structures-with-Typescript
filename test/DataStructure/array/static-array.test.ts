import { StaticArray } from "@DataStructure/array/static-array";
import { IArray } from "@Interface/specific/IArray";
import { IError } from "@Interface/common/IError";
import { Msg } from "@Utils/Errors";


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

    it(`#remove value by positive index`, () => {
        staticArray.removeByIndex(2);
        expect(staticArray[2]).toBe(16);
    });

    it(`#remove value by negative index`, () => {
        expect(staticArray[-5]).toBe(16);
    })

    it(`#insert value by positive index`, () => {
        staticArray.insertByIndex(44, 4);
        expect(staticArray[4]).toBe(44);
        expect(staticArray[5]).toBe(2);
    })

    it(`#insert value by negative index`, () => {
        expect(staticArray[-3]).toBe(44);
        expect(staticArray[-2]).toBe(2);
    })

    it(`#insert value till the Array is full`, () => {
        staticArray.append(100);
        expect(staticArray[6]).toBe(100);
        expect(staticArray[-1]).toBe(100);
        try {
            staticArray.insertByIndex(32, 5); // cannot be inserted into the Array since it's full
        } catch (error) {
            const e : IError = error;
            expect(e.message).toBe(Msg.NoMoreSpace);
        }
    })

    it(`print the array`, () => {
        staticArray.print();
    });

});
