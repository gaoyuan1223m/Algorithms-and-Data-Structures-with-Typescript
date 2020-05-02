import { HeapSort } from "@Algorithm/sort";

describe(`Test for Heapsort`, () => {

    it(`Case 1`, () => {
        const arr = [3, 5, 8, 1, 6, 4, 7, 0, 2, 9];
        HeapSort(arr);
        console.log(arr);

        for (let index = 1; index < arr.length; index++) {
            expect(arr[index] >= arr[index - 1]).toBe(true);
        }
    });
})