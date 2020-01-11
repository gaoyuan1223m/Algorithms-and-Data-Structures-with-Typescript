
import { IList } from "@Interface/common";

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
     * @param capacity: initial capacity of the Array
     * @param incrementals: incrementals of capacity when the dynamic array is full of valid elements
     */
    new <T>(capacity: number, incrementals?: number): IArray<T>;
}

