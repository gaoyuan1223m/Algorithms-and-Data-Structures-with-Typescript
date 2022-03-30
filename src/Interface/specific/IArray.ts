
import { IList } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";

export interface IArray<T> extends IList<T> {
    /**
     * *the number of rooms in current Array*
     */
    readonly length: number;
    /**
     * *whether elements are increasingly ordered*
     */
    readonly isInIncreasingOrder: boolean;
    /**
     * @param n index of the element on the Array
     */
    [n: number]: T;
}

export interface IArrayLike<T> {
    [index: number]: T
}

export interface IArrayConstructor {

    /**
     * @param capacity initial capacity of the Array
     * @param compare comparison function to compare two elements in the Array
     * @param incrementals incrementals of capacity when the dynamic array is full of valid elements
     */
    new <T>(capacity: number, compare: ICompareFunc<T>, incrementals?: number): IArray<T>;
}

