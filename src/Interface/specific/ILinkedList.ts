export interface ILinkedList<T> {
    /**
     * Return the number of the list nodes on current Linked List
     */
    readonly size: number;

    /**
     * Return the value (typeof T) of the HEAD list node 
     */
    readonly head: T;

    /**
     * Return the value (typeof T) of the TAIL list node
     */
    readonly tail: T;
    
    /**
     * Add a List Node at the end of the Linked List
     * @param value value of a single list node
     */
    append(value: T, nodeId: string): this;

    /**
     * Insert a new list node on the Linked List a
     * @param value value of a single list node
     * @param index index of the inserted list node
     */
    insert(value: T, index: number, nodeId?: string): this;

    /**
     * Insert a new list node at the HEAD
     * @param value value of a single list node
     */
    insertFirst(value: T, nodeId?: string): this;

    /**
     * Find a list node from the Linked List
     * @param index index of the list node that has to be searched
     */
    findbyIndex(index: number): T;

    /**
     * Find a list node from the Linked List
     * @param nodeId unique ID of the list node 
     */

    findByNodeId(nodeId: string): T;    

    /**
     * Look up the index of the list node, if it's not there, return -1
     * @param value value of the list node on the Linked List that has to be searched
     */
    indexOf(value: T): number;
    
    /**
     * Remove a list node from the Linked List
     * @param index index of the list node that has to be removed from the Linked List 
     */
    removeByIndex(index: number): T;

    removeByNodeId(nodeId: string): T;
    
    /**
     * Remove the first list node from the Linked List
     */
    removeFirst(): T;

    /**
     * Remove the last list node from the Linked List
     */
    removeLast(): T;

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