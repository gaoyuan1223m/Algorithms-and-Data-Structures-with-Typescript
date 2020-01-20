import { IHeap } from "@Interface/specific/IHeap"
import { HeapFactory } from "@DataStructure/heap/heap"

describe(`Test for MAX-Binary-Heap`, () => {
    // [ 10, 9, 7, 8, 2, 3, 4, 5, 6, 0, 1, undefined, undefined, undefined, undefined ]
    const heap: IHeap<number> = HeapFactory.create();
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

})