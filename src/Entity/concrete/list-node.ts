
import { ISinglyListNodeConstructor, IDoublyListNodeConstructor, ISinglyListNode, IDoublyListNode } from "@Interface/specific";

export const SinglyListNode: ISinglyListNodeConstructor = class SLLNode<T> implements ISinglyListNode<T> {

    constructor(
        public value: T = null,
        public next: ISinglyListNode<T> = null,
    ) { }
}

export const DoublyListNode: IDoublyListNodeConstructor = class DLLNode<T> extends SinglyListNode<T> {

    constructor(
        public value: T = null,
        public next: IDoublyListNode<T> = null,
        public prev: IDoublyListNode<T> = null
    ) {
        super(value, next)
    }
}
