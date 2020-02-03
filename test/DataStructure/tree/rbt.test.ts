import { inRed, inBlack, inGreen } from "@Utils/emphasize";
import { BinaryRedBlackTree } from "@DataStructure/tree";

describe(`Test for ${inRed("Red")}-${inBlack("Black")}-${inGreen("Tree")}`, () => {
    const elements = [8, 4, 3, 1, 2, 11, 15, 10, 9]
    const RBT = new BinaryRedBlackTree<number>();

    beforeAll(() => {
        // for (const elem of elements) {
        //     RBT.append(elem);
        // }
        RBT.appendRange(...elements);
    });

    it(`#Should return right ${inRed("SIZE")}`, () => {
        expect(RBT.size).toBe(elements.length);
    });

    it(`#Should return right ${inRed("PATH")}`, () => {
        expect(RBT.findPath(8)).toEqual([1, 0, 0]);
        expect(RBT.findPath(4)).toEqual([]);
        expect(RBT.findPath(3)).toEqual([0, 1]);
        expect(RBT.findPath(1)).toEqual([0, 0]);
        expect(RBT.findPath(2)).toEqual([0]);
        expect(RBT.findPath(11)).toEqual([1]);
        expect(RBT.findPath(15)).toEqual([1, 1]);
        expect(RBT.findPath(10)).toEqual([1, 0, 1]);
        expect(RBT.findPath(9)).toEqual([1, 0]);
    })
})