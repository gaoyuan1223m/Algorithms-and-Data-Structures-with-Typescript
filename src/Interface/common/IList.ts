import { ICollection } from "@Interface/common/ICollection";
import { ICompareFunc } from "@Utils/compare";

/**
 * *IList provides clients with CRUD methods.*
 * *Element on the IList has a unique Index Signature by which clients can query the element.*
 * *Generally, Array, LinkedList can implement IList Interface* 
 */
export interface IList<T> extends ICollection<T> {

    /**
     * *Return the numbers of element from the List*
     */
    readonly size: number;

    /**
     * *Return the first element from the List*
     */
    readonly head: T;

    /**
     * *Return the last element from the list*
     */
    readonly tail: T;

    /**
     * *Insert a new element at the index on the List*
     * @param value: value of a single element
     * @param index: index of the inserted element
     */
    insertByIndex(value: T, index: number): this;

    /**
     * *Remove a element by its index from the List*
     * @param index: index of the element that has to be removed from the List 
     */
    removeByIndex(index: number): T;

    /**
     * *Update value of the Object by its index on the List*
     * @param value: the value that needs to be updated on the Array
     * @param index: the position where the old value is located
     */
    updateByIndex(value: T, index: number): this;

    /**
     * *Get a element from the List by its index*
     * @param index: index of the element that has to be searched
     */
    getByIndex(index: number): T;

    /**
     * *Look up the index of the element, if it's not there, return -1*
     * @param value: value of the element that has to be searched on the List 
     */
    indexOf(value: T, compare?: ICompareFunc<T>): number;

    /**
     * *Reverse the whole list*
     */
    reverse(): this;
}