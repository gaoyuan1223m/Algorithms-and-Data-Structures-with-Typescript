import { TreePrintOrder, TreeTypes } from "@Utils/types";
import { inRed, inYellow, inGreen, inBlue } from "@Utils/emphasize";
import { BinaryTreeFactory } from "@DataStructure/tree";


describe(`Test for AVL Tree [BASCIS]`, () => {

    const elements = [8, 4, 3, null, 1, 2, 11, 15, 10, 9]
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);
    const elements2 = [8, 5, 10, 3, 7, 9, 11, 2, 4, 6];

    beforeAll(() => {
        for (const e of elements) {
            AVL.append(e);
        }
    });

    it(`#Get Size of AVL`, () => {
        expect(AVL.size).toBe(elements.length - 1);
    });

    it(`#Get AVL Tree Height`, () => {
        expect(AVL.height).toBe(4)
    })

    it(`#Get Max Value on the AVL Tree`, () => {
        expect(AVL.maxValue).toBe(15);
    });

    it(`#Get Min Value on the AVL Tree`, () => {
        expect(AVL.minValue).toBe(1);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(AVL.findPath(15)).toEqual([1, 1]);
        expect(AVL.findPath(11)).toEqual([1]);
        expect(AVL.findPath(10)).toEqual([1, 0, 1]);
        expect(AVL.findPath(9)).toEqual([1, 0]);
        expect(AVL.findPath(8)).toEqual([1, 0, 0]);
        expect(AVL.findPath(4)).toEqual([]);
        expect(AVL.findPath(3)).toEqual([0, 1]);
        expect(AVL.findPath(2)).toEqual([0]);
        expect(AVL.findPath(1)).toEqual([0, 0]);
    });

    it(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(15)).toEqual(2);
        expect(AVL.getDepth(11)).toEqual(1);
        expect(AVL.getDepth(10)).toEqual(3);
        expect(AVL.getDepth(9)).toEqual(2);
        expect(AVL.getDepth(8)).toEqual(3);
        expect(AVL.getDepth(4)).toEqual(0);
        expect(AVL.getDepth(3)).toEqual(2);
        expect(AVL.getDepth(2)).toEqual(1);
        expect(AVL.getDepth(1)).toEqual(2);
        expect(AVL.getDepth(13)).toEqual(-1);
        expect(AVL.getDepth(111)).toEqual(-1);
    })

    xit(`#Find a Path of values NOT on the Tree`, () => {
        expect(AVL.findPath(13)).toEqual(null);
        expect(AVL.findPath(111)).toEqual(null);
    });

    xit(`#Contains a value?`, () => {
        expect(AVL.contains(12)).toBe(true);
        expect(AVL.contains(8)).toBe(true);
        expect(AVL.contains(14)).toBe(false);
    });

    xit(`#ByPath to find value`, () => {
        expect(AVL.byPath()).toBe(7);
        expect(AVL.byPath(1, 1, 0)).toBe(10);
        expect(AVL.byPath(0, 0)).toBe(4);
        expect(AVL.byPath(1, 0, 1)).toBe(null);
    });

    xit(`#Tree height`, () => {
        expect(AVL.height).toBe(4);
    })

    xit(`#Print AVL`, () => {
        AVL.print(TreePrintOrder.PreOrder, true);
        AVL.print(TreePrintOrder.PreOrder, false);
        // [7, 5, 4, 3, 6, 9, 8, 11, 10, 12]

        AVL.print(TreePrintOrder.InOrder, true);
        AVL.print(TreePrintOrder.InOrder, false);
        // [3, 4, 5, 6, 7, 8, 9 ,10, 11, 12]

        AVL.print(TreePrintOrder.PostOrder, true);
        // AVL.print(TreePrintOrder.PostOrder, false);
        // [3, 4, 6, 5, 8, 10, 12, 11, 9, 7]

        AVL.print(TreePrintOrder.LevelOrder);
        // [7, 5, 9, 4, 6, 8, 11, 3, 10, 12]
    });

    it(`#${inRed("REMOVE")} "${inGreen("LEAF: 15")}" if existed`, () => {
        expect(AVL.remove(15).size).toBe(elements.length - 2);
        expect(AVL.height).toBe(4);
        // AVL.print(TreePrintOrder.InOrder);
    });

    it(`#${inRed("REMOVE")} "${inGreen("LEAF: 11")}" if existed`, () => {
        expect(AVL.remove(11).size).toBe(elements.length - 3);
        expect(AVL.height).toBe(3);
        // AVL.print(TreePrintOrder.InOrder);
    });

    it(`#${inRed("REMOVE")} "${inGreen("2-Degree: 4")}" if existed`, () => {
        expect(AVL.remove(4).size).toBe(elements.length - 4);
        expect(AVL.height).toBe(3);
        // AVL.print(TreePrintOrder.InOrder);
    });

    it(`#${inRed("REMOVE")} "${inGreen("1-Degree: 2")}" if existed`, () => {
        expect(AVL.remove(2).size).toBe(elements.length - 5);
        expect(AVL.height).toBe(3);
        // AVL.print(TreePrintOrder.InOrder);
    });

    it(`#${inRed("REMOVE")} "${inGreen("LEAF: 1")}" if existed`, () => {
        expect(AVL.remove(1).size).toBe(elements.length - 6);
        expect(AVL.height).toBe(3);
        expect(AVL.rootValue).toBe(9);
        // AVL.print(TreePrintOrder.InOrder);
    });

});


describe(`Test for AVL Tree ${inYellow('[Complex LL]')}`, () => {
    const elements = [50, 70, 30, 10, 40, 5];
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);

    beforeAll(() => {
        elements.forEach(e => { AVL.append(e) });
    });

    it(`#Should have right size`, () => {
        expect(AVL.size).toBe(elements.length);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(AVL.findPath(50)).toEqual([1]);
        expect(AVL.findPath(70)).toEqual([1, 1]);
        expect(AVL.findPath(30)).toEqual([]);
        expect(AVL.findPath(10)).toEqual([0]);
        expect(AVL.findPath(20)).toEqual(null);
        expect(AVL.findPath(40)).toEqual([1, 0]);
        expect(AVL.findPath(5)).toEqual([0, 0]);
    });

    it(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(50)).toEqual(1);
        expect(AVL.getDepth(70)).toEqual(2);
        expect(AVL.getDepth(30)).toEqual(0);
        expect(AVL.getDepth(10)).toEqual(1);
        expect(AVL.getDepth(20)).toEqual(-1);
        expect(AVL.getDepth(40)).toEqual(2);
        expect(AVL.getDepth(5)).toEqual(2);
    });

    it(`#Find value by given path`, () => {
        expect(AVL.byPath()).toBe(30);
        expect(AVL.byPath(1, 0)).toBe(40);
        expect(AVL.byPath(0, 0)).toBe(5);
        expect(AVL.byPath(0, 1, 1)).toBe(null);
        expect(AVL.byPath(1, 1, 2)).toBe(70);
    });
});


describe(`Test for AVL Tree ${inBlue('[Complex RR]')}`, () => {
    const elements = [50, 70, 30, 60, 80, 90];
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);

    beforeAll(() => {
        elements.forEach(e => { AVL.append(e) });
    });

    it(`#Should have right size`, () => {
        expect(AVL.size).toBe(elements.length);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(AVL.findPath(50)).toEqual([0]);
        expect(AVL.findPath(70)).toEqual([]);
        expect(AVL.findPath(30)).toEqual([0, 0]);
        expect(AVL.findPath(60)).toEqual([0, 1]);
        expect(AVL.findPath(5)).toEqual(null);
        expect(AVL.findPath(90)).toEqual([1, 1]);
        expect(AVL.findPath(80)).toEqual([1]);
    });

    it(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(50)).toEqual(1);
        expect(AVL.getDepth(70)).toEqual(0);
        expect(AVL.getDepth(30)).toEqual(2);
        expect(AVL.getDepth(60)).toEqual(2);
        expect(AVL.getDepth(5)).toEqual(-1);
        expect(AVL.getDepth(90)).toEqual(2);
        expect(AVL.getDepth(80)).toEqual(1);
    });

});

describe(`Test for AVL Tree ${inGreen('[Complex LR]')}`, () => {
    const elements = [70, 50, 80, 72, 90, 75];
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);

    beforeAll(() => {
        elements.forEach(e => { AVL.append(e) });
    });

    it(`#Should have right size`, () => {
        expect(AVL.size).toBe(elements.length);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(AVL.findPath(70)).toEqual([0]);
        expect(AVL.findPath(50)).toEqual([0, 0]);
        expect(AVL.findPath(80)).toEqual([1]);
        expect(AVL.findPath(60)).toEqual(null);
        expect(AVL.findPath(72)).toEqual([]);
        expect(AVL.findPath(90)).toEqual([1, 1]);
        expect(AVL.findPath(75)).toEqual([1, 0]);
    });

    it(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(70)).toEqual(1);
        expect(AVL.getDepth(50)).toEqual(2);
        expect(AVL.getDepth(80)).toEqual(1);
        expect(AVL.getDepth(60)).toEqual(-1);
        expect(AVL.getDepth(72)).toEqual(0);
        expect(AVL.getDepth(90)).toEqual(2);
        expect(AVL.getDepth(75)).toEqual(2);
    });

});

describe(`Test for AVL Tree ${inRed('[Complex RL]')}`, () => {
    const elements = [50, 70, 30, 10, 40, 35];
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);

    beforeAll(() => {
        elements.forEach(e => { AVL.append(e) });
    });

    it(`#Should have right size`, () => {
        expect(AVL.size).toBe(elements.length);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(AVL.findPath(50)).toEqual([1]);
        expect(AVL.findPath(70)).toEqual([1, 1]);
        expect(AVL.findPath(30)).toEqual([0]);
        expect(AVL.findPath(10)).toEqual([0, 0]);
        expect(AVL.findPath(5)).toEqual(null);
        expect(AVL.findPath(40)).toEqual([]);
        expect(AVL.findPath(35)).toEqual([0, 1]);
    });

    it(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(50)).toBe(1);
        expect(AVL.getDepth(70)).toBe(2);
        expect(AVL.getDepth(30)).toBe(1);
        expect(AVL.getDepth(10)).toBe(2);
        expect(AVL.getDepth(5)).toBe(-1);
        expect(AVL.getDepth(40)).toBe(0);
        expect(AVL.getDepth(35)).toBe(2);
    });

});

describe(`Test for AVL Tree ${inRed("Ultimate")}`, () => {
    const elements = [
        98, 67, 61, 90, 49, 53, 25, 12, 16, 93, 76, 8, 70, 10, 75, 17, 
        43, 18, 7, 15, 23, 73, 14, 94, 69, 92, 91, 30, 87, 40, 81, 59, 
        72, 4, 68, 3, 50, 65, 19, 34, 82, 74, 85, 86
    ];
    const AVL = BinaryTreeFactory.create<number>(TreeTypes.AVL);

    beforeAll(() => {
        AVL.appendRange(...elements);
    });

    it(`Should return right size of elements`, () => {
        expect(AVL.size).toBe(elements.length);
    });
})
/**
 * *          7            *
 *          /   \
 * *       5      9        *
 *        / \   /   \
 * *     4   6 8    11     *
 *      /         /    \
 * *   3         10     12 *
 */

/**
* *           8            *
*          /    \
* *       5      10        *
*        /  \   /  \
* *     3    7 9    11     *
*      / \  /
* *   2   4 6              *
*/


