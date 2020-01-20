import { ICollectionBase } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";


export interface IHeap<T> extends ICollectionBase {

    /**
     * Return the Peak value of the HEAP without removing it
     */
    readonly peak: T;

    /**
     * *Add an element to the HEAP*
     * @param value element to add to the HEAP
     */
    add(value: T): this;

    /**
     * *Remove the Peak element from the HEAP*
     */
    removePeak(): this;

    /**
     * *Replace the Peak Value by the new one passed in*
     * @param value element to replace the Peak element of the HEAP
     */
    replacePeakBy(value: T): this;
}

export interface IHeapConstructor {
    new <T>(capacity?: number, compare?: ICompareFunc<T>): IHeap<T>
}

/**
 * Implement HEAP by Dynamic Array since it's a complete Binary HEAP
 * n is the number of elements
 * i is index of the some element
 *
 * i = 0, root node
 * i > 0, its parent is ~~((i -1)/2)
 *
 * if (2i + 1 <= n - 1), left node 2i + 1
 * if (2i + 1 > n - 1), no left
 *
 * if (2i + 2 <= n - 1), right node 2i + 2
 * if (2i + 2 > n - 1), no right
 */