import { AVLBinaryTree } from "@DataStructure/tree";
import { TreePrintOrder } from "@Utils/types";


describe(`Test for AVL Tree`, () => {

    // const elements = [7, 5, 9, null, 4, 6, 3, 8, 11, 10];
    const elements = [8, 4, 3, null, 1, 2, 11, 15, 10, 9]
    const AVL = new AVLBinaryTree<number>();
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

    xit(`#Get Depth of the Nodes on the Tree`, () => {
        expect(AVL.getDepth(12)).toEqual(3);
        expect(AVL.getDepth(3)).toEqual(3);
        expect(AVL.getDepth(7)).toEqual(0);
        expect(AVL.getDepth(9)).toEqual(1);
        expect(AVL.getDepth(5)).toEqual(1);
        expect(AVL.getDepth(4)).toEqual(2);
        expect(AVL.getDepth(6)).toEqual(2);
        expect(AVL.getDepth(8)).toEqual(2);
        expect(AVL.getDepth(11)).toEqual(2);
        expect(AVL.getDepth(10)).toEqual(3);
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

    xit(`#remove LEAF elements if existed`, () => {
        expect(AVL.remove(6).size).toBe(elements.length - 1);
        expect(AVL.height).toBe(4);
        // AVL.print(TreePrintOrder.InOrder);
        // [3, 4, 5, 7, 8, 9 ,10, 11, 12]
    });

    xit(`#remove PARENT elements with ONE child if existed`, () => {
        expect(AVL.remove(4).size).toBe(elements.length - 2);
        expect(AVL.height).toBe(4);
        // AVL.print(TreePrintOrder.InOrder);
        // [3, 5, 7, 8, 9 ,10, 11, 12]
    });

    xit(`#remove PARENT elements with TWO Children if existed`, () => {
        expect(AVL.remove(9).size).toBe(elements.length - 3);
        expect(AVL.height).toBe(4);
        // AVL.print(TreePrintOrder.InOrder);
        // [3, 5, 7, 8, 10, 11, 12]
    });

    xit(`#remove 10 and 12 and check the current the height of tree`, () => {
        expect(AVL.remove(10).remove(11).height).toBe(3);
    })

    xit(`#Is it COMPLETE?`, () => {
        expect(AVL.isComplete()).toBe(false);
    });

    xit(`#Build a new AVL and judge whether it's COMPLETE`, () => {
        AVL
            .clear()
            .appendRange(...elements2)
        // .print(TreePrintOrder.InOrder, false);

        expect(AVL.size).toBe(elements2.length);
        expect(AVL.isComplete()).toBe(true)
        expect(AVL.height).toBe(4);
    });

});



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


