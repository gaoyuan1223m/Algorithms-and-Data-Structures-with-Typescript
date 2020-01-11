import { IList, INode, IListBase } from "@Interface/common";

export interface ILimitedLinkedList<T> extends IListBase<T> {

    /**
     * *Add element(s) to the HEAD of List*
     * @param values element(s) that need(s) to add to the HEAD of the List
     */
    insertAtHead(...values: T[]): this;

    /**
     * *Add element(s) to the TAIL of List*
     * @param values element(s) that need(s) to add to the TAIL of the List
     */
    insertAtTail(...values: T[]): this;

    /**
     * *Remove one element from the HEAD of List and return it*
     */
    removeFromHead(): T;
    /**
     * *Remove multiple elements from the HEAD of List and return in Array*
     * @param n the number of element(s) that need(s) to remove
     */
    removeFromHead(n: number): T[];

    /**
     * *Remove one element from the TAIL of the List and retun it*
     */
    removeFromTail(): T;
    /**
     * *Remove multiple elements from the TAIL of the List and return in Array*
     * @param n the number of element(s) that need(s) to remove
     */
    removeFromTail(n: number): T[];

}

export interface ILinkedList<T> extends ILimitedLinkedList<T>, IList<T> {


}

export interface ISinglyListNode<T> extends INode<T> {
    next: ISinglyListNode<T>;
}

export interface IDoublyListNode<T> extends INode<T> {
    next: IDoublyListNode<T>;
    prev: IDoublyListNode<T>;
}

export interface IDoublyListNodeConstructor {
    new <T>(value?: T, next?: IDoublyListNode<T>, prev?: IDoublyListNode<T>): IDoublyListNode<T>;
}

export interface ISinglyListNodeConstructor {
    new <T>(value?: T, next?: ISinglyListNode<T>): ISinglyListNode<T>;
}

