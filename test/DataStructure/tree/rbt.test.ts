import { inRed, inBlack, inGreen, inBlue } from "@Utils/emphasize";
import { BinaryTreeFactory } from "@DataStructure/tree";
import { TreeTypes, TreeNodeColor } from "@Utils/types";
import { IRBT } from "@Interface/specific";

describe(`Test for ${inRed("Red")}-${inBlack("Black")}-${inGreen("Tree")}`, () => {
    const elements = [8, 4, 3, 1, 2, 11, 15, 10, 9]
    const RBT = BinaryTreeFactory.create<number>(TreeTypes.RBT) as IRBT<number>;

    beforeAll(() => {
        for (const elem of elements) {
            RBT.append(elem);
        }
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
    });

    it(`#Should return right color`, () => {
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(1)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(2)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(11)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(15)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(9)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(100)).toBe(null)
    })

    it(`#Should remove "LEAF" element "${inRed(1)}"`, () => {
        RBT.remove(1)
        expect(RBT.size).toBe(elements.length - 1);
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(1)).toBe(null);
        expect(RBT.getColor(2)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(11)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(15)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(9)).toBe(TreeNodeColor.Black);
    });

    it(`#Should remove "2-Degree" element "${inRed(11)}"`, () => {
        RBT.remove(11)
        expect(RBT.size).toBe(elements.length - 2);
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(2)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(11)).toBe(null);
        expect(RBT.getColor(15)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(9)).toBe(TreeNodeColor.Black);
    });

    it(`#Should remove "LEAF" element "${inBlack(15)}"`, () => {
        RBT.remove(15)
        expect(RBT.size).toBe(elements.length - 3);
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(2)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(15)).toBe(null);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(9)).toBe(TreeNodeColor.Red);
    });

    it(`#Should remove "1-Degree" element "${inBlack(2)}"`, () => {
        RBT.remove(2)
        expect(RBT.size).toBe(elements.length - 4);
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(2)).toBe(null);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(9)).toBe(TreeNodeColor.Red);
    });

    it(`#Should remove "2-Degree" element "${inRed(9)}"`, () => {
        RBT.remove(9)
        expect(RBT.size).toBe(elements.length - 5);
        expect(RBT.getColor(8)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(4)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(3)).toBe(TreeNodeColor.Black);
        expect(RBT.getColor(10)).toBe(TreeNodeColor.Red);
        expect(RBT.getColor(9)).toBe(null);
    });


})

describe(`Test for ${inRed("Red")}-${inBlack("Black")}-${inGreen("Tree")} - ${inBlue("Ultimate")}`, () => {
    const elements = [
        55, 47, 7, 8, 68, 61, 12, 99, 11, 64, 33, 36, 9, 81, 49, 46, 70, 35, 76, 93, 32,
        94, 38, 100, 63, 22, 78, 69, 45, 18, 58, 97, 26, 59, 34, 21, 20, 5, 80, 15, 2, 4
    ];
    const RBT = BinaryTreeFactory.create<number>(TreeTypes.RBT) as IRBT<number>;

    beforeAll(() => {
        for (const elem of elements) {
            RBT.append(elem);
        }
    });

    it(`#Should return right ${inRed("SIZE")}`, () => {
        expect(RBT.size).toBe(elements.length);
    });

    xit(`#Should return right color"`, () => {
        
    });

    xit(`#Should remove "2-Degree" element "${inRed(11)}"`, () => {
        RBT.remove(11)
        expect(RBT.size).toBe(elements.length - 2);
    });

})