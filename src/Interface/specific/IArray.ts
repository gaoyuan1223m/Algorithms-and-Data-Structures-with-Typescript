import { ICollection } from "@Interface/common/ICollection";
import { IList } from "@Interface/common/IList";

export interface IArray<T> extends IArrayLike<T>, IList<T> {    

}

interface IArrayLike<T> {
    /**
     * @param size: the number of the elements in the Array, expect NULL/Undefined/NaN
     */
    readonly size: number;

    /**
     * @param length: a number one higher than the index of the latest element in an array.
     */
    readonly length: number;

    /**
     * *index signature*
     */
    [n: number]: T;
}

interface IArrayConstructor {
    new <T> (capacity: number): IArray<T>;
}