import { ICollection, ICollectionBase } from "@Interface/common/ICollection";
import { ICompareFunc } from "@Utils/compare";
import { SortMethods } from "@Algorithm/sort";

export interface IListBase<T> extends ICollectionBase {

    /**
     * @return {number} the number of current elements on the List
     */
    readonly size: number;

    /**
     * @return {T} the first element from the List without removing it*
     */
    readonly head: T;

    /**
     * @return {T} the last element from the List without removing it*
     */
    readonly tail: T;
}

export interface IList<T> extends IListBase<T>, ICollection<T> {

    /**
     * *Insert a new element at the index on the List*
     * @param value element to add
     * @param index index where the new element is located after inserting
     */
    insertByIndex(value: T, index: number): this;

    /**
     * *Remove a element by its index from the List*
     * @param index index of the element to remove from the List 
     */
    removeByIndex(index: number): T;

    /**
     * *Update the element by its index on the List*
     * @param value element to update
     * @param index index of the old element replaced by the new one
     */
    updateByIndex(value: T, index: number): this;

    /**
     * *Get a element by its index from the List*
     * @param index index of the element to find
     */
    getByIndex(index: number): T;

    /**
     * *Look up the index of the element on the List, if it's not there, return -1*
     * @param value element to search 
     */
    indexOf(value: T, compare?: ICompareFunc<T>): number;

    /**
     * *Reverse the whole list*
     */
    reverse(): this;

    /**
     * *Sort element elements on the List Increaingly or Decreasingly*
     */
    sort(compare?: ICompareFunc<T>, method?: SortMethods): this;
}