import { TreeMap } from "@DataStructure/map-set";
import { catchErr, Errors } from "@Utils/error-handling";
import { inRed, inGreen, inBlue, inBlack } from "@Utils/emphasize";

describe(`Test for Tree Map`, () => {
    const treeMap = new TreeMap<string, string>();
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
        for (const { id, name } of avengers) {
            treeMap.set(id, name);
        }
    });

    it(`Should return right size`, () => {
        expect(treeMap.size).toBe(avengers.length);
    });

    it(`Should ${inGreen("contain")} key`, () => {
        expect(catchErr(treeMap.has.bind(treeMap))(null)).toBe(Errors.Msg.InvalidDictKey);
        expect(treeMap.has('x456')).toBe(true);
        expect(treeMap.has('4551')).toBe(false);
    });

    it(`Should ${inBlue("get")} value by key`, () => {
        expect(catchErr(treeMap.get.bind(treeMap))(null)).toBe(Errors.Msg.InvalidDictKey);
        expect(treeMap.get('x456')).toBe("Ryan");
        expect(treeMap.get('4551')).toBe(null);
    });

    it(`Should ${inRed("delete")} value by 1-degree ${inBlack("key")}`, () => {
        expect(catchErr(treeMap.del.bind(treeMap))(undefined)).toBe(Errors.Msg.InvalidDictKey);
        expect(treeMap.del('x456')).toBe("Ryan");
        expect(treeMap.size).toBe(avengers.length - 1)
        expect(treeMap.del('4551')).toBe(null);
    });

    it(`Should ${inRed("delete")} value by 0-degree ${inBlack("key")}`, () => {
        expect(treeMap.del('f56h')).toBe("Peter");
        expect(treeMap.size).toBe(avengers.length - 2)
    });

    it(`Should ${inRed("delete")} value by 2-degree ${inRed("key")}`, () => {
        expect(treeMap.del('o66e')).toBe("Halk");
        expect(treeMap.size).toBe(avengers.length - 3)
    });

    it(`Should ${inRed("delete")} value by 2-degree ${inBlack("key")}`, () => {
        expect(treeMap.del('g87j')).toBe("Steve");
        expect(treeMap.size).toBe(avengers.length - 4)
    });
})