import { IList, INode } from "@Interface/common";

export interface ILinkedList<T> extends IList<T> {

    /**
     * *Add element(s) to the HEAD of List*
     * @param values element(s) to add to the HEAD of the List
     */
    insertAtHead(...values: T[]): this;

    /**
     * *Add element(s) to the TAIL of List*
     * @param values element(s) to add to the TAIL of the List
     */
    insertAtTail(...values: T[]): this;

    /**
     * *Remove one element from the HEAD of List and return it*
     */
    removeFromHead(): T;
    /**
     * *Remove multiple elements from the HEAD of List and return in Array*
     * @param n the number of element(s) to remove
     */
    removeFromHead(n: number): T[];

    /**
     * *Remove one element from the TAIL of the List and retun it*
     */
    removeFromTail(): T;
    /**
     * *Remove multiple elements from the TAIL of the List and return in Array*
     * @param n the number of element(s) to remove
     */
    removeFromTail(n: number): T[];

}

export interface ISinglyListNode<T> extends INode<T> {
    next: ISinglyListNode<T>;
}

export interface IDoublyListNode<T> extends ISinglyListNode<T> {
    prev: IDoublyListNode<T>;
}

export interface IDoublyListNodeConstructor {
    new <T>(value?: T, next?: IDoublyListNode<T>, prev?: IDoublyListNode<T>): IDoublyListNode<T>;
}

export interface ISinglyListNodeConstructor {
    new <T>(value?: T, next?: ISinglyListNode<T>): ISinglyListNode<T>;
}

