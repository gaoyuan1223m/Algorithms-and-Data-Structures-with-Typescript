import { IArray } from "@Interface/specific/IArray";
import { ICompareFunction, defaultCompare, isLess, isLarger } from "@Utils/comparison";

/**
 * *Sort Array by Quick-Sort*
 * *This Method selects the middle element, idx is (left + right)/2 to INT, as the PIVOT*
 * @param arr Array that needs to be sorted
 * @param left Starting index of the Array, it's generally 0; 
 * @param right Ending index of the Array, it's normally (array.length - 1)
 * @param ICompareFunc Methods that compares two element
 */
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

//**Successful: use First Element as Pivot */
// const pivot = arr[left];

//     let i = left + 1, j = right;
//     let temp: T;

//     while (true) {
//         while (i <= right && isLess(ICompareFunc(arr[i], pivot))) {
//             ++i;
//         }
//         while (isLarger(ICompareFunc(arr[j], pivot))) {
//             --j;
//         }
//         if (i < j) {
//             temp = arr[j];
//             arr[j] = arr[i];
//             arr[i] = temp;
//             ++i;
//             --j;
//         } else {
//             break;
//         }
//     }

//     temp = arr[left];
//     arr[left] = arr[j];
//     arr[j] = temp;

//     QuickSort(arr, left, j - 1, ICompareFunc);

//     QuickSort(arr, j + 1, right, ICompareFunc);