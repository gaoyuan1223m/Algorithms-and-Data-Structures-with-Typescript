
import { HeapFactory } from "@DataStructure/heap";
import { BinaryHeapTypes } from "@Utils/types";

describe(`Test for MAX-Binary-Heap`, () => {

    const MaxBH = HeapFactory.create<number>(BinaryHeapTypes.MAX);
    const elements = [5, 6, 3, 7, 2, 9, 4, 8, 10, 0, 1];
    const elements2 = [5, 6, 2, 7, 3, 9, 0, 8, 10, 4, 1];

    beforeAll(() => {
        elements.forEach(elem => { MaxBH.add(elem) });
    });

    it(`Should return corrent size of the HEAP`, () => {
        MaxBH.print(); // [ 10, 9, 7, 8, 2, 3, 4, 5, 6, 0, 1 ]
        expect(MaxBH.size).toBe(elements.length);
    });

    it(`Should return the Largeset element from the HEAP [1]`, () => {
        expect(MaxBH.removePeak()).toBe(10);
        expect(MaxBH.size).toBe(elements.length - 1);
        // heap.print(); // [ 9, 8, 7, 6, 2, 3, 4, 5, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [2]`, () => {
        expect(MaxBH.removePeak()).toBe(9);
        expect(MaxBH.size).toBe(elements.length - 2);
        // heap.print();// [ 8, 6, 7, 5, 2, 3, 4, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [3]`, () => {
        expect(MaxBH.removePeak()).toBe(8);
        expect(MaxBH.size).toBe(elements.length - 3);
        // heap.print();// [ 7, 6, 4, 5, 2, 3, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [4]`, () => {
        expect(MaxBH.removePeak()).toBe(7);
        expect(MaxBH.size).toBe(elements.length - 4);
        // heap.print();// [ 6, 5, 4, 0, 2, 3, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [5]`, () => {
        expect(MaxBH.removePeak()).toBe(6);
        expect(MaxBH.size).toBe(elements.length - 5);
        // heap.print();// [ 5, 2, 4, 0, 1, 3 ]
    });

    it(`Should return the Largeset element from the HEAP [6]`, () => {
        expect(MaxBH.removePeak()).toBe(5);
        expect(MaxBH.size).toBe(elements.length - 6);
        // heap.print();// [ 4, 2, 3, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [7]`, () => {
        expect(MaxBH.removePeak()).toBe(4);
        expect(MaxBH.size).toBe(elements.length - 7);
        // heap.print();// [ 3, 2, 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [8]`, () => {
        expect(MaxBH.removePeak()).toBe(3);
        expect(MaxBH.size).toBe(elements.length - 8);
        // heap.print();// [ 2, 0, 1 ]
    });

    it(`Should return the Largeset element from the HEAP [9]`, () => {
        expect(MaxBH.removePeak()).toBe(2);
        expect(MaxBH.size).toBe(elements.length - 9);
        // heap.print(); // [ 1, 0 ]
    });

    it(`Should return the Largeset element from the HEAP [10]`, () => {
        expect(MaxBH.removePeak()).toBe(1);
        expect(MaxBH.size).toBe(elements.length - 10);
        // heap.print();// [ 0 ]
    });

    it(`Should return the Largeset element from the HEAP [11]`, () => {
        expect(MaxBH.removePeak()).toBe(0);
        expect(MaxBH.size).toBe(elements.length - 11);
        // heap.print();// [  ]
    });

    it(`Should replace the Peak by the new value [1]`, () => {
        elements2.forEach(elem => { MaxBH.add(elem) })
        expect(MaxBH.size).toBe(elements2.length);
        MaxBH.print();

        expect(MaxBH.replacePeakBy(3)).toBe(10);
        expect(MaxBH.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [2]`, () => {
        expect(MaxBH.replacePeakBy(0)).toBe(9);
        expect(MaxBH.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [3]`, () => {
        expect(MaxBH.replacePeakBy(10)).toBe(8);
        expect(MaxBH.size).toBe(elements2.length);
        // heap.print();
    })

    it(`Should replace the Peak by the new value [4]`, () => {
        expect(MaxBH.replacePeakBy(4)).toBe(10);
        expect(MaxBH.size).toBe(elements2.length);
        // heap.print();
    })

})