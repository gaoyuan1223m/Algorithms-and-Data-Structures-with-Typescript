import { IArray } from "@Interface/specific/IArray";
import { ICompareFunction, defaultCompare, isLess, isLarger } from "@Utils/comparison";

export function QuickSort<T>(arr: IArray<T>, left: number, right: number, ICompareFunc: ICompareFunction<T> = defaultCompare): void {

    if (left >= right) return;

    const idx = Partition(arr, left, right, ICompareFunc);

    QuickSort(arr, left, idx - 1, ICompareFunc);

    QuickSort(arr, idx, right, ICompareFunc);

}


function Partition<T>(arr: IArray<T>, left: number, right: number, ICompareFunc: ICompareFunction<T>): number {
    const pivot = arr[Math.floor((left + right) / 2)];

    while (left <= right) {

        while (isLess(ICompareFunc(arr[left], pivot))) {
            left++;
        }

        while (isLarger(ICompareFunc(arr[right], pivot))) {
            right--;
        }

        if (left <= right) {
            let temp = arr[right];
            arr[right] = arr[left];
            arr[left] = temp;
            left += 1;
            right -= 1;
        }
    }

    return left;
}
