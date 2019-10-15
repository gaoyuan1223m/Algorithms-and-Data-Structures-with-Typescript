
export class OneWayLinkedList<T> {

    private _head: ListNode<T>;
    private _tail: ListNode<T>;
    private _size: number;

    constructor() {
        this._head = new ListNode<T>();
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    get first(): T {
        return this._head.next.value;
    }

    public addFirst(value: T): void {
        const newNode = new ListNode<T>().addValue(value);
        newNode.next = this._head.next;
        this._head.next = newNode;
        if (!this._tail) {
            this._tail = newNode;
        }
        this._size += 1;
    }

    public append(value: T): void {
        const newNode = new ListNode<T>().addValue(value);
        if (this._tail) {
            this._tail.next = newNode;
        } else {
            this._head.next = newNode;
        }
        this._tail = newNode;
        this._size += 1;
    }

    public removeFirst(): T {
        const first = this._head.next.value;
        this._head.next = this._head.next.next;
        if (!this._head.next) {
            this._tail = this._head.next;
        }
        this._size -= 1;
        return first;
    }

    public print(): void {
        let pointer = this._head.next;
        let str = 'HEAD -> ';
        while (pointer) {
            str += ` ${pointer.value} ->`
            pointer = pointer.next;
        }
        str += ` END`;
        console.log(str);
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

}

class ListNode<T> {

    public value: T;
    public next: ListNode<T>;

    addValue(v: T) {
        this.value = v;
        return this;
    }

    addNext(next: ListNode<T>) {
        this.next = next;
        return this;
    }

}

