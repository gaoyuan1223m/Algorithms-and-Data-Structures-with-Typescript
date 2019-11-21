export class DoublyLinkedList<T> {
    private _headSentry: ListNode<T>;
    private _tailSentry: ListNode<T>;
    private _size: number;

    constructor(){
        this._headSentry = new ListNode<T>(null);
        this._tailSentry = new ListNode<T>(null);
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    get head(): T {
        return this._headSentry.next.value;
    }

    get tail(): T {
        return this._tailSentry.prev.value;
    }
    

}

class ListNode<T> {
    
    public value: T;
    public prev: ListNode<T>;
    public next: ListNode<T>;

    constructor(value: T) {
        this.value = value;
    }

    public addPrevNode(prev: ListNode<T> = null) {
        this.prev = prev;
        return this;
    }

    public addNextNode(next: ListNode<T> = null) {
        this.next = next;
        return this;
    }

}