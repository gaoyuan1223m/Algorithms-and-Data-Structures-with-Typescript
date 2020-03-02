import { Dictionary, Dictionary1 } from "@DataStructure/map-set"
import { IDictionary } from "@Interface/specific";
import { catchErr, Errors } from "@Utils/error-handling";

xdescribe(`Test for Dictionary`, () => {

    const dict: IDictionary = new Dictionary();
    const avengers = [
        { id: "x456", name: "Ryan" },
        { id: "f56h", name: "Peter" },
        { id: "g87j", name: "Steve" },
        { id: "l57e", name: "T'Challa" },
        { id: "be52", name: "Ramenaff" },
        { id: "o66e", name: "Halk" },
        { id: "1e4r", name: "Sour" },
        { id: "vfr1", name: "Tony" },
        { id: "56hy", name: "Cathy" },
        { id: "234e", name: "Lucy" },
        { id: "mj02", name: "Packer" }
    ]

    beforeAll(() => {
        for (const avenger of avengers) {
            dict.set(avenger.id, avenger.name);
        }
    });

    it(`#Should return correct size of the Dictionary`, () => {
        expect(dict.size).toBe(avengers.length);
        expect(dict.isEmpty()).toBe(false);
    });

    it(`#Should return correct value by visiting its key`, () => {
        expect(dict.has("g87j")).toBe(true);
        expect(dict.get("g87j")).toBe("Steve");

        expect(dict.has("ghtr")).toBe(false);
        expect(dict.get("ghtr")).toBe(null);
    });

    it(`#Should delete the existed keys`, () => {
        expect(dict.del("mj02")).toBe(true);
        expect(catchErr(dict.del.bind(dict))("fgtr")).toBe(Errors.Msg.InvalidDictKey);
        expect(dict.size).toBe(avengers.length - 1);
    })

    it(`#Should print`, () => {
        expect(dict.print());
    });

    it(`#Should clear the Dict`, () => {
        expect(dict.clear().isEmpty()).toBe(true);
    });

});

describe(`Test for Dictionary1 [MAP with RBT]`, () => {
    const dict: IDictionary = new Dictionary1();
    const avengers = [
        { id: "x456", name: "Ryan" },
        { id: "f56h", name: "Peter" },
        { id: "g87j", name: "Steve" },
        { id: "l57e", name: "T'Challa" },
        { id: "be52", name: "Ramenaff" },
        { id: "o66e", name: "Halk" },
        { id: "1e4r", name: "Sour" },
        { id: "vfr1", name: "Tony" },
        { id: "56hy", name: "Cathy" },
        { id: "234e", name: "Lucy" },
        { id: "mj02", name: "Packer" }
    ]

    beforeAll(() => {
        for (const avenger of avengers) {
            dict.set(avenger.id, avenger.name);
        }
    });

    it(`#Should return correct size of the Dictionary`, () => {
        expect(dict.size).toBe(avengers.length);
        expect(dict.isEmpty()).toBe(false);
    });

    it(`#Should return correct value by visiting its key`, () => {
        expect(dict.has("g87j")).toBe(true);
        // expect(dict.get("g87j")).toBe("Steve");

        expect(dict.has("ghtr")).toBe(false);
        // expect(dict.get("ghtr")).toBe(null);
    });

    xit(`#Should delete the existed keys`, () => {
        expect(dict.del("mj02")).toBe(true);
        expect(catchErr(dict.del.bind(dict))("fgtr")).toBe(Errors.Msg.InvalidDictKey);
        expect(dict.size).toBe(avengers.length - 1);
    })

    xit(`#Should print`, () => {
        expect(dict.print());
    });

    xit(`#Should clear the Dict`, () => {
        expect(dict.clear().isEmpty()).toBe(true);
    });
})