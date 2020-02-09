import { HeapFactory } from "@DataStructure/heap";
import { BinaryHeapTypes } from "@Utils/types";
import { inRed } from "@Utils/emphasize";

describe(`Test for MAX-Binary-Heap`, () => {

    const MinBH = HeapFactory.create<number>(BinaryHeapTypes.MIN);
    const elements = [5, 6, 3, 7, 2, 9, 4, 8, 10, 0, 1];
    const elements2 = [5, 6, 2, 7, 3, 9, 0, 8, 10, 4, 1];

    beforeAll(() => {
        elements.forEach(elem => { MinBH.add(elem) });
    });

    it(`Should return corrent size of the HEAP`, () => {
        MinBH.print(); // [ 0, 1, 4, 7, 2, 9, 5, 8, 10, 6, 3]
        expect(MinBH.size).toBe(elements.length);
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[1]')}`, () => {
        expect(MinBH.removePeak()).toBe(0);
        expect(MinBH.size).toBe(elements.length - 1);
        // MinBH.print(); // [ 1, 2, 4, 7, 3, 9, 5, 8, 10, 6 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[2]')}`, () => {
        expect(MinBH.removePeak()).toBe(1);
        expect(MinBH.size).toBe(elements.length - 2);
        // MinBH.print();// [ 2, 3, 4, 7, 6, 9, 5, 8, 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[2]')}`, () => {
        expect(MinBH.removePeak()).toBe(2);
        expect(MinBH.size).toBe(elements.length - 3);
        // MinBH.print();// [ 3, 6, 4, 7, 10, 9, 5, 8 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[3]')}`, () => {
        expect(MinBH.removePeak()).toBe(3);
        expect(MinBH.size).toBe(elements.length - 4);
        // MinBH.print();// [ 4, 6, 5, 7, 10, 9, 8 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[4]')}`, () => {
        expect(MinBH.removePeak()).toBe(4);
        expect(MinBH.size).toBe(elements.length - 5);
        // MinBH.print();// [ 5, 6, 8, 7, 10, 9 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[5]')}`, () => {
        expect(MinBH.removePeak()).toBe(5);
        expect(MinBH.size).toBe(elements.length - 6);
        // MinBH.print();// [ 6, 7, 8, 9, 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[6]')}`, () => {
        expect(MinBH.removePeak()).toBe(6);
        expect(MinBH.size).toBe(elements.length - 7);
        // MinBH.print();// [ 7, 9, 8, 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[7]')}`, () => {
        expect(MinBH.removePeak()).toBe(7);
        expect(MinBH.size).toBe(elements.length - 8);
        // MinBH.print();// [ 8, 9, 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[8]')}`, () => {
        expect(MinBH.removePeak()).toBe(8);
        expect(MinBH.size).toBe(elements.length - 9);
        // MinBH.print(); // [ 9, 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[9]')}`, () => {
        expect(MinBH.removePeak()).toBe(9);
        expect(MinBH.size).toBe(elements.length - 10);
        // MinBH.print();// [ 10 ]
    });

    it(`Should return the Smallest element from the HEAP ${inRed('[10]')}`, () => {
        expect(MinBH.removePeak()).toBe(10);
        expect(MinBH.size).toBe(elements.length - 11);
        // MinBH.print();// [  ]
    });

    it(`Should replace the Peak by the new value [1]`, () => {
        elements2.forEach(elem => { MinBH.add(elem) })
        expect(MinBH.size).toBe(elements2.length);
        MinBH.print(); // [ 0, 1, 2, 7, 3, 9, 5, 8, 10, 6, 4 ]

        expect(MinBH.replacePeakBy(3)).toBe(0);
        expect(MinBH.size).toBe(elements2.length);
        // MinBH.print(); // [ 1, 3, 2, 7, 3, 9, 5, 8, 10, 6, 4 ]
    });

    it(`Should replace the Peak by the new value [2]`, () => {
        expect(MinBH.replacePeakBy(0)).toBe(1);
        expect(MinBH.size).toBe(elements2.length);
        // MinBH.print(); // [ 0, 3, 2, 7, 3, 9, 5, 8, 10, 6, 4 ]
    });

    it(`Should replace the Peak by the new value [3]`, () => {
        expect(MinBH.replacePeakBy(10)).toBe(0);
        expect(MinBH.size).toBe(elements2.length);
        // MinBH.print(); // [ 2, 3, 5, 7, 3, 9, 10, 8, 10, 6, 4 ]
    });

    it(`Should replace the Peak by the new value [4]`, () => {
        expect(MinBH.replacePeakBy(4)).toBe(2);
        expect(MinBH.size).toBe(elements2.length);
        // MinBH.print(); // [ 3, 3, 5, 7, 4, 9, 10, 8, 10, 6, 4 ]
    });

})