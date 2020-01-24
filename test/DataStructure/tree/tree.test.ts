import { ITree } from "@Interface/specific";
import { BinarySearchTree } from "@DataStructure/tree";
import { TreePrintOrder } from "@Utils/types";

describe(`Test for Binary Search Tree`, () => {

    const BST: ITree<number> = new BinarySearchTree();
    const elements = [7, 5, 9, 4, 6, 3, 8, 11, 12, 10];

    beforeAll(() => {
        BST.appendRange(...elements);
    });

    it(`#Get Size of BST`, () => {
        expect(BST.size).toBe(10);
    });

    it(`#Get Max Value on the Tree`, () => {
        expect(BST.maxValue).toBe(12);
    });

    it(`#Get Min Value on the Tree`, () => {
        expect(BST.minValue).toBe(3);
    });

    it(`#Find a Path of values on the Tree`, () => {
        expect(BST.findPath(12)).toEqual([1, 1, 1]);
        expect(BST.findPath(3)).toEqual([0, 0, 0]);
        expect(BST.findPath(7)).toEqual([]);
        expect(BST.findPath(9)).toEqual([1]);
        expect(BST.findPath(5)).toEqual([0]);
        expect(BST.findPath(4)).toEqual([0, 0]);
        expect(BST.findPath(6)).toEqual([0, 1]);
        expect(BST.findPath(8)).toEqual([1, 0]);
        expect(BST.findPath(11)).toEqual([1, 1]);
        expect(BST.findPath(10)).toEqual([1, 1, 0]);
    });

    it(`#Find a Path of values NOT on the Tree`, () => {
        expect(BST.findPath(13)).toEqual([-1]);
        expect(BST.findPath(111)).toEqual([-1]);
    });

    it(`#Contains a value?`, () => {
        expect(BST.contains(12)).toBe(true);
        expect(BST.contains(8)).toBe(true);
        expect(BST.contains(14)).toBe(false);
    });

    it(`#ByPath to find value`, () => {
        expect(BST.byPath()).toBe(7);
        expect(BST.byPath(1, 1, 0)).toBe(10);
        expect(BST.byPath(0, 0)).toBe(4);
        expect(BST.byPath(1, 0, 1)).toBe(null);
    });

    it(`#Print BST`, () => {
        BST.print(TreePrintOrder.PreOrder, true);
        BST.print(TreePrintOrder.PreOrder, false);
        // [7, 5, 4, 3, 6, 9, 8, 11, 10, 12]

        BST.print(TreePrintOrder.InOrder, true);
        BST.print(TreePrintOrder.InOrder, false);
        // [3, 4, 5, 6, 7, 8, 9 ,10, 11, 12]

        // BST.print(TreePrintOrder.PostOrder, true);
        // BST.print(TreePrintOrder.PostOrder, false);
        // // [3, 4, 6, 5, 8, 10, 12, 11, 9, 7]

        // BST.print(TreePrintOrder.LevelOrder);
        // // [7, 5, 9, 4, 6, 8, 11, 3, 10, 12]
    });

    xit(`#remove LEAF elements if existed`, () => {
        expect(BST.remove(6).size).toBe(elements.length - 1);
        BST.print(TreePrintOrder.InOrder);
        // [3, 4, 5, 7, 8, 9 ,10, 11, 12]
    });

    xit(`#remove PARENT elements with ONE child if existed`, () => {
        expect(BST.remove(4).size).toBe(elements.length - 2);
        BST.print(TreePrintOrder.InOrder);
        // [3, 5, 7, 8, 9 ,10, 11, 12]
    });

    xit(`#remove PARENT elements with TWO Children if existed`, () => {
        expect(BST.remove(9).size).toBe(elements.length - 3);
        BST.print(TreePrintOrder.InOrder);
        // [3, 5, 7, 8, 10, 11, 12]
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


