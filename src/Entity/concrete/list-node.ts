export class SinglyListNode<T> {

    public value: T;
    public next: SinglyListNode<T>;

    constructor(
        value: T = null,
        next: SinglyListNode<T> = null,
    ) {
        this.value = value;
        this.next = next;
    }
}

export class DoublyListNode<T> {

    public value: T;
    public next: DoublyListNode<T>;
    public prev: DoublyListNode<T>;

    constructor(
        value: T = null,
        next: DoublyListNode<T> = null,
        prev: DoublyListNode<T> = null
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}