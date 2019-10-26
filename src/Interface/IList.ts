import { IComparable } from "./IComparable";

export interface IList<T extends IComparable<T>> {
    /**
     * Return the number of the list nodes on current Linked List
     */
    readonly size: number;

    /**
     * Add a List Node at the end of the Linked List
     * @param value value of a single list node
     */
    add(value: T): this;

    /**
     * Insert a new list node on the Linked List a
     * @param value value of a single list node
     * @param index index of the inserted list node
     */
    insert(value: T, index: number): this;

    /**
     * Find a list node from the Linked List
     * @param index index of the list node that has to be searched
     */
    find(index: number): T;


    /**
     * Look up the index of the list node, if it's not there, return -1
     * @param value value of the list node that has to be searched on the Linked List 
     */
    indexOf(value: T): number;
    
    /**
     * Remove a list node from the Linked List
     * @param index index of the list node that has to be removed from the Linked List 
     */
    remove(index: number): T;

    /**
     * Return whether the currect Linked List is empty or not
     */
    isEmpty(): boolean;

    /**
     * Print all nodes on the Linked List
     */
    print(): void;

    /**
     * Clear all node from the Linked List
     */
    clear(): void;
    
}