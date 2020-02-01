
import { IList } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";

export interface IArray<T> extends IList<T> {
    /**
     * @return the length of the current Array
     */
    readonly length: number;

    /**
     * @param n index of the element on the Array
     */
    [n: number]: T;

}

export interface IArrayConstructor {

    /**
     * @param capacity initial capacity of the Array
     * @param compare comparison function to compare two elements in the Array
     * @param incrementals incrementals of capacity when the dynamic array is full of valid elements
     */
    new <T>(capacity: number, compare: ICompareFunc<T>, incrementals?: number): IArray<T>;
}

