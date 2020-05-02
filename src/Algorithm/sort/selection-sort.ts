import { ICompareFunc, valueTypeComparison } from "@Utils/compare";

export function SelectionSort<T>(arr: T[], compare: ICompareFunc<T> = valueTypeComparison) {
    for (let end = arr.length - 1; end > 0; end--) {
        let maxIndex = 0;
        for (let begin = 1; begin <= end; begin++) {
            if (compare(arr[maxIndex]).isLargerThan(arr[begin])) continue;

            maxIndex = begin
        }
        swap(arr, maxIndex, end);
    }
}

function swap<T>(arr: T[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
/**
 * Selection sort can be regarded as an improvement to Bubble-Sort
 */