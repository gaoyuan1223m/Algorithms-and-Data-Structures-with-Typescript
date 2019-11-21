import { ICollection } from "@Interface/common/ICollection";
import { IList } from "@Interface/common/IList";

export interface IArray<T> extends IList<T> {
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
    new <T>(capacity: number): IArray<T>;
}