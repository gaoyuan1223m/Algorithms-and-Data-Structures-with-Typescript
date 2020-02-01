import { shuffle } from "@Algorithm/array"

describe(`Test Shuffle Algorithm`, () => {
    const arr = [0, 1, 3, 4, 4, 5, 5, 7, 8, 9, 11, 16, 27];

    it(`#Shuffle Array<number>`, () => {
        expect(shuffle(arr)).not.toEqual(arr);
        expect(shuffle(arr).length).toBe(arr.length);
    });

})