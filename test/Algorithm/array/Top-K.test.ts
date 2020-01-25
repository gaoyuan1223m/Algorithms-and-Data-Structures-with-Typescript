import { HeapFactory } from "@DataStructure/heap"

/**
 * @description To find Top K minimum number in the array
 */


describe(`TOP K MINIMUM`, () => {
    const K = 5;
    const elements = [
        33, 2, 15, 7, 5, 4, 37, 25, 11, 16, 23,
        42, 14, 40, 38, 43, 24, 13, 41, 21, 10,
        12, 44, 35, 31, 3, 32, 9, 22, 34, 8, 26,
        27, 30, 36, 6, 20, 17, 19, 45, 18, 29, 1
    ];// [1,2, 3, 4, 5]
    const maxBinaryHeap = HeapFactory.create<number>();

    beforeAll(() => {
        for (const e of elements) {
            if(maxBinaryHeap.size < K) {
                maxBinaryHeap.add(e);
            }else if (maxBinaryHeap.peak > e) {
                maxBinaryHeap.replacePeakBy(e);
            }
        }
    });

    it(`Should return right size`, () => {
        expect(maxBinaryHeap.size).toBe(K);
        maxBinaryHeap.print();
    })
})