import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
/**
    An optimized Bubble-sort that decrease times of swap
 */
export function BubbleSort<T>(arr: T[], compare: ICompareFunc<T> = valueTypeComparison) {
    for (let end = arr.length - 1; end > 0; end--) {
        let sortedIndex = 1;

        for (let begin = 1; begin <= end; begin++) {

            if (compare(arr[begin]).isLargerOrEqualTo(arr[begin - 1])) continue;

            swap(arr, begin, begin - 1);
            sortedIndex = begin;

        }
        end = sortedIndex;
    }
}

function swap<T>(arr: T[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}