
import { IList } from "@Interface/common/IList";
import { ICompareFunc } from "@Utils/compare/comparison";
import { SortMethods } from "@Algorithm/sort/sort-methods";

export interface IArray<T> extends IList<T> {
    /**
     * @param length: equals to the current capacity of the Array.
     */
    readonly length: number;

    /**
     * *index signature*
     */
    [n: number]: T;
    
}

export interface IArrayConstructor {

    /**
     * @param capacity: initial capacity of the Array
     * @param compare: comparison function
     * @param incrementals: increment of capacity when the dynamic array is full of valid elements
     */
    new <T>(capacity: number, incrementals?: number): IArray<T>;
}

