import { ICollection } from "@Interface/common/ICollection";
import { IList } from "@Interface/common/IList";
import { IEqualsFunction } from "@Utils/comparison";

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
    new <T>(capacity: number, equalsFunctions?: IEqualsFunction<T>): IArray<T>;
}