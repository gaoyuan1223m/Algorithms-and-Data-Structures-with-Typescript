export class TwoWayLinkedList<T> {
    private _head: ListNode<T>;
    private _tail: ListNode<T>;
    private _size: number;

    constructor(){
        this._head = new ListNode<T>();
        this._tail = new ListNode<T>();
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    get head(): T {
        return this._head.next.value;
    }

    get tail(): T {
        return this._tail.prev.value;
    }
    

}

class ListNode<T> {
    
    public value: T;
    public prev: ListNode<T>;
    public next: ListNode<T>;

    public addValue(v: T){
        this.value = v;
        return this;
    }

    public addPrevNode(prev: ListNode<T>) {
        this.prev = prev;
        return this;
    }

    public addNextNode(next: ListNode<T>) {
        this.next = next;
        return this;
    }

}