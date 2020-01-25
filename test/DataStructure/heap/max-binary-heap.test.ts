
import { HeapFactory } from "@DataStructure/heap";

describe(`Test for MAX-Binary-Heap`, () => {

    const heap = HeapFactory.create<number>(15);
    const elements = [5, 6, 3, 7, 2, 9, 4, 8, 10, 0, 1];
    const elements2 = [5, 6, 2, 7, 3, 9, 0, 8, 10, 4, 1];

    beforeAll(() => {
        for (const e of elements) {
            heap.add(e);
        }
    });

    it(`Should return corrent size of the HEAP`, () => {
        // heap.print(); // [ 10, 9, 7, 8, 2, 3, 4, 5, 6, 0, 1 ]
        expect(heap.size).toBe(elements.length);
    });

    it(`Should return the Largeset element from the HEAP [1]`, () => {
        expect(heap.removePeak()).toBe(10);
        expect(heap.size).toBe(elements.length - 1);
        // heap.print(); // [ 9, 8, 7, 6, 2, 3, 4, 5, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [2]`, () => {
        expect(heap.removePeak()).toBe(9);
        expect(heap.size).toBe(elements.length - 2);
        // heap.print();// [ 8, 6, 7, 5, 2, 3, 4, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [3]`, () => {
        expect(heap.removePeak()).toBe(8);
        expect(heap.size).toBe(elements.length - 3);
        // heap.print();// [ 7, 6, 4, 5, 2, 3, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [4]`, () => {
        expect(heap.removePeak()).toBe(7);
        expect(heap.size).toBe(elements.length - 4);
        // heap.print();// [ 6, 5, 4, 0, 2, 3, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [5]`, () => {
        expect(heap.removePeak()).toBe(6);
        expect(heap.size).toBe(elements.length - 5);
        // heap.print();// [ 5, 2, 4, 0, 1, 3 ]
    });

    it(`Should return the Largeset element from the HEAP [6]`, () => {
        expect(heap.removePeak()).toBe(5);
        expect(heap.size).toBe(elements.length - 6);
        // heap.print();// [ 4, 2, 3, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [7]`, () => {
        expect(heap.removePeak()).toBe(4);
        expect(heap.size).toBe(elements.length - 7);
        // heap.print();// [ 3, 2, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [8]`, () => {
        expect(heap.removePeak()).toBe(3);
        expect(heap.size).toBe(elements.length - 8);
        // heap.print();// [ 2, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [9]`, () => {
        expect(heap.removePeak()).toBe(2);
        expect(heap.size).toBe(elements.length - 9);
        // heap.print(); // [ 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [10]`, () => {
        expect(heap.removePeak()).toBe(1);
        expect(heap.size).toBe(elements.length - 10);
        // heap.print();// [ 0 ]
    });

    it(`Should return the Largeset element from the HEAP [11]`, () => {
        expect(heap.removePeak()).toBe(0);
        expect(heap.size).toBe(elements.length - 11);
        // heap.print();// [  ]
    });

    it(`Should replace the Peak by the new value [1]`, () => {
        for (const elem of elements2) {
            heap.add(elem);
        }
        expect(heap.size).toBe(elements2.length);
        // heap.print();

        expect(heap.replacePeakBy(3)).toBe(10);
        expect(heap.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [2]`, () => {
        expect(heap.replacePeakBy(0)).toBe(9);
        expect(heap.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [3]`, () => {
        expect(heap.replacePeakBy(10)).toBe(8);
        expect(heap.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [4]`, () => {
        expect(heap.replacePeakBy(4)).toBe(10);
        expect(heap.size).toBe(elements2.length);
        // heap.print();
    })

})