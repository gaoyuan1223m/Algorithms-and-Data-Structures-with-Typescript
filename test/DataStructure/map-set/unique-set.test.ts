import { UniqueSet } from "@DataStructure/map-set";
import { IUniqueSet } from "@Interface/specific";
import { catchErr, Errors } from "@Utils/error-handling";

describe(`Test for Unique-Set`, () => {

    const set: IUniqueSet = new UniqueSet();

    const names = [
        "Ryan", "Peter", "Peter", "Steve", "T'Challa", "Ramenaff",
        "Tony", "Cathy", "Lucy", "Packer", "Halk", "Sour"
    ];

    beforeAll(() => {
        for (const name of names) {
            set.add(name);
        }
    });

    it(`#Should return the current size of the Set`, () => {
        expect(set.size).toBe(names.length - 1);
    });

    it(`#Should NOT add the value that is exsited on the Set`, () => {
        expect(set.add("Ryan").size).toBe(names.length - 1);
    });

    it(`Should add value to the Set`, () => {
        expect(set.add("ryan").size).toBe(names.length);
    });

    it(`Should return true if the Set contains the value to query`, () => {
        expect(set.has("Ryan")).toBe(true);
    });

    it(`Shoulde delete value if existed`, () => {
        expect(set.del("ryan")).toBe(true);
        expect(catchErr(set.del.bind(set))("Rhgyse")).toBe(Errors.Msg.NotExisted);
    });

    it(`Should print the Set`, () => {
        set.print();
    });

    it(`Should clear all the elements on the Set`, () => {
        expect(set.clear().isEmpty()).toBe(true);
    });

});