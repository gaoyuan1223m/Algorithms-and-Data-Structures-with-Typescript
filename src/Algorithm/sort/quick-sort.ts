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

// function findIdxOfElementLessThanPivot<T>(arr: IArray<T>, indexFrom: number, indexTo: number, pivot: number, ICompareFunc: ICompareFunction<T>): number {
//     let idx = indexFrom;
//     while (idx < indexTo && isLess(ICompareFunc(arr[idx], arr[pivot]))) {
//         idx += 1;
//     }
//     return idx;
// }

// function findIdxOfElementLargerThanPivot<T>(arr: IArray<T>, indexFrom: number, indexTo: number, pivot: number, ICompareFunc: ICompareFunction<T>): number {
//     let idx = indexFrom;
//     while (idx > indexTo && isLarger(ICompareFunc(arr[idx], arr[pivot]))) {
//         idx -= 1;
//     }
//     return idx;
// }

// function swap<T>(arr: IArray<T>, idx1: number, idx2: number, pivot: number): { idx1: number, idx2: number } {
//     if (idx1 < idx2) {
//         let temp = arr[idx2];
//         arr[idx2] = arr[idx1];
//         arr[idx1] = temp;
//         idx1 += 1;
//         idx2 -= 1;
//     } else {
//         let temp = arr[idx2];
//         arr[idx2] = arr[pivot];
//         arr[pivot] = temp;
//     }
//     return { idx1, idx2 };
// }

// function partition(array: Array<number>, left: number = 0, right: number = array.length - 1) {
//     const pivot = array[Math.floor((right + left) / 2)];
//     let i = left;
//     let j = right;

//     while (i <= j) {
//         while (array[i] < pivot) {
//             i++;
//         }

//         while (array[j] > pivot) {
//             j--;
//         }

//         if (i <= j) {
//             [array[i], array[j]] = [array[j], array[i]];
//             i++;
//             j--;
//         }
//     }

//     return i;
// }
// export function QuickSort(array: Array<number>, left: number = 0, right: number = array.length - 1) {
//     let index;

//     if (array.length > 1) {
//         index = partition(array, left, right);

//         if (left < index - 1) {
//             QuickSort(array, left, index - 1);
//         }

//         if (index < right) {
//             QuickSort(array, index, right);
//         }
//     }

//     return array;
// }