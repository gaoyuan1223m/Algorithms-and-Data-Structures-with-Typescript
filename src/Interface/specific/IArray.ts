
import { IList } from "@Interface/common/IList";
import { IEqualsFunction } from "@Utils/comparison";
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

    /**
     * *Sort curent Array Increaingly or Decreasingly*
     */
    sort(sortMethod?: SortMethods): this;
}


export interface IArrayConstructor {
    new <T>(capacity: number, equalsFunctions?: IEqualsFunction<T>, incrementals?: number): IArray<T>;
}

