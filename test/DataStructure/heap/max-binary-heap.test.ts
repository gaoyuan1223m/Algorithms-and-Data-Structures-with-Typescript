
import { HeapFactory } from "@DataStructure/heap";

describe(`Test for MAX-Binary-Heap`, () => {
    // [ 10, 9, 7, 8, 2, 3, 4, 5, 6, 0, 1, undefined, undefined, undefined, undefined ]
    const heap = HeapFactory.create<number>(15);
    const elements = [5, 6, 3, 7, 2, 9, 4, 8, 10, 0, 1];

    beforeAll(() => {
        for (const e of elements) {
            heap.add(e);
        }
    });

    it(`Should return corrent size of the HEAP`, () => {
        heap.print();
        expect(heap.size).toBe(elements.length);
    });

    it(`Should return the Largeset element from the HEAP [1]`, () => {
        expect(heap.removePeak()).toBe(10);
        expect(heap.size).toBe(elements.length - 1);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [2]`, () => {
        expect(heap.removePeak()).toBe(9);
        expect(heap.size).toBe(elements.length - 2);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [3]`, () => {
        expect(heap.removePeak()).toBe(8);
        expect(heap.size).toBe(elements.length - 3);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [4]`, () => {
        expect(heap.removePeak()).toBe(7);
        expect(heap.size).toBe(elements.length - 4);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [5]`, () => {
        expect(heap.removePeak()).toBe(6);
        expect(heap.size).toBe(elements.length - 5);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [6]`, () => {
        expect(heap.removePeak()).toBe(5);
        expect(heap.size).toBe(elements.length - 6);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [7]`, () => {
        expect(heap.removePeak()).toBe(4);
        expect(heap.size).toBe(elements.length - 7);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [8]`, () => {
        expect(heap.removePeak()).toBe(3);
        expect(heap.size).toBe(elements.length - 8);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [9]`, () => {
        expect(heap.removePeak()).toBe(2);
        expect(heap.size).toBe(elements.length - 9);
        heap.print();
    });

    it(`Should return the Largeset element from the HEAP [10]`, () => {
        expect(heap.removePeak()).toBe(1);
        expect(heap.size).toBe(elements.length - 10);
        heap.print();
    });

})