
import { ISinglyListNodeConstructor, IDoublyListNodeConstructor, ISinglyListNode, IDoublyListNode } from "@Interface/specific";

export const SinglyListNode: ISinglyListNodeConstructor = class SinglyListNode<T> implements ISinglyListNode<T> {

    value: T;
    next: ISinglyListNode<T>;

    constructor(
        value: T = null,
        next: ISinglyListNode<T> = null,
    ) {
        this.value = value;
        this.next = next;
    }
}

export const DoublyListNode: IDoublyListNodeConstructor = class DoublyListNode<T> implements IDoublyListNode<T> {

    public value: T;
    public next: IDoublyListNode<T>;
    public prev: IDoublyListNode<T>;

    constructor(
        value: T = null,
        next: IDoublyListNode<T> = null,
        prev: IDoublyListNode<T> = null
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
