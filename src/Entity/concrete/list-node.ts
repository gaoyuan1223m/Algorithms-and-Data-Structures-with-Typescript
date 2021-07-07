
import {
    ISinglyListNode, ISinglyListNodeConstructor,
    IDoublyListNode, IDoublyListNodeConstructor
} from "@Interface/specific";


class SLLNode<T> implements ISinglyListNode<T> {

    constructor(
        public value: T = null,
        public next: ISinglyListNode<T> = null,
    ) { }
}

class DLLNode<T> extends SLLNode<T> {

    constructor(
        public value: T = null,
        public next: IDoublyListNode<T> = null,
        public prev: IDoublyListNode<T> = null
    ) {
        super(value, next)
    }
}

export const SinglyListNode: ISinglyListNodeConstructor = SLLNode;
export const DoublyListNode: IDoublyListNodeConstructor = DLLNode;
