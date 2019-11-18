import { ICollection } from "@Interface/common/ICollection.Generic";

export interface IList<T> extends ICollection<T> {
   
    /**
     * Insert a new element on the List
     * @param value value of a single element
     * @param index index of the inserted element
     */
    insertByIndex(value: T, index: number): this;

    /**
     * Find a element from the List
     * @param index index of the element that has to be searched
     */
    findByIndex(index: number): T;


    /**
     * Look up the index of the element, if it's not there, return -1
     * @param value value of the element that has to be searched on the List 
     */
    indexOf(value: T): number;

    /**
     * Remove a element from the List
     * @param index index of the element that has to be removed from the List 
     */
    removeByIndex(index: number): T;

}