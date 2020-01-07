import { IList } from "@Interface/common/IList";
import { ICompareFunc } from "@Utils/compare/comparison";

export interface ILinkedList<T> extends IList<T> {

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
    removeHeadNode(): T;

    /**
     * *Remove a TailNode from the current Linked List*
     */
    removeTaiNode(): T;

}

export interface ILinkedListConstructor {
    new <T>(): ILinkedList<T>
}