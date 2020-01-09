import { ITree } from "@Interface/specific";
import { BinarySearchTree } from "@DataStructure/tree";

describe(`Test for Binary Search Tree`, () => {

    const BST: ITree<number> = new BinarySearchTree<number>();

    beforeAll(() => {
        BST.appendRange([7, 5, 9, 4, 6, 3, 8, 11, 12, 10]);
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

    it(`Contains a value`, () => {
        expect(BST.contains(12)).toBe(true);
        expect(BST.contains(8)).toBe(true);
        expect(BST.contains(14)).toBe(false);
    })

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


