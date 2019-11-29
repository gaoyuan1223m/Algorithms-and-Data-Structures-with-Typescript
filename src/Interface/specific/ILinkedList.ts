import { IList } from "@Interface/common/IList";

export interface ILinkedList<T> extends IList<T> {

    /**
     * Return the value (typeof T) of the HEAD list node 
     */
    readonly head: T;

    /**
     * Return the value (typeof T) of the TAIL list node
     */
    readonly tail: T;

    /**
     * *Add a HeadNode to the current Linked List*
     * @param value: value of a single List Node
     */
    addHeadNode(value: T): this;

    /**
     * *Add a TailNode to the current Linked List*
     * @param value: value of a single List Node
     */
    addTailNode(value: T): this;

    /**
     * *Remove a HeadNode from the current Linked List*
     */
    removeHeadNode(): this;

    /**
     * *Remove a TailNode from the current Linked List*
     */
    removeTaiNode(): this;

}