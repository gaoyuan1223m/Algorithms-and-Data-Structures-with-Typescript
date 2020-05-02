import { ICompareFunc, valueTypeComparison } from "@Utils/compare";

export function HeapSort<T>(arr: T[], compare: ICompareFunc<T> = valueTypeComparison) {

    let size = arr.length;
    // heapify in place
    for (let index = (size >> 1) - 1; index >= 0; index--) {
        _siftDown(arr, index, size, compare)
    }

    // heap-sort
    while (size) {
        swap(arr, 0, --size);
        _siftDown(arr, 0, size, compare);
    }
}


function _siftDown<T>(arr: T[], index: number, size: number, compareFn: ICompareFunc<T>) {
    const value = arr[index];
    while (_hasChild(index, size)) {
        // It must have left node if having child
        let leftIndex = _getLeftChildIndex(index);
        let leftValue = arr[leftIndex];

        let rightIndex = leftIndex + 1;

        // in case right node is large than the left one, here leftValue is the largest
        if (_hasRightChild(index, size) && compareFn(arr[rightIndex]).isLargerThan(leftValue)) {
            leftValue = arr[leftIndex = rightIndex]; 
        }

        // for stable concern
        if (compareFn(leftValue).isLessThan(value)) break;

        arr[index] = leftValue;
        index = leftIndex;
    }

    arr[index] = value;
}

function _hasChild(index: number, size: number): boolean {
    return index < (size >> 1);;
}

function _hasRightChild(index: number, size: number): boolean {
    return 2 * index + 2 < size;
}

function _getLeftChildIndex(index: number): number {
    return 2 * index + 1;
}

function swap<T>(arr: T[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Heap sort can be regarded as an improvement to Selection Sort
 */