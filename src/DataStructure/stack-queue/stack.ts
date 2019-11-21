import { SinglyLinkedList } from "@DataStructure/linked-list/singly-linked-list";

/**
 * @Last_In_and_First_Out
 * 
 * Push()
 * Pop()
 */

export class ArrayStack<T> {

    private _as: Array<T>;

    constructor() {
        this._as = [];
    }

    get size(): number {
        return this._as.length;
    }

    get peek(): T {
        return this._as[this.size - 1];
    }

    public push(v: T): void {
        this._as.push(v);
    }

    public pop(): T | undefined {
        return this._as.pop();
    }

    public print(): void {
        console.log(this._as);
    }
}

export class LinkedListStack<T> {

    private _ls: SinglyLinkedList<T>;

    constructor() {
        this._ls = new SinglyLinkedList<T>();
    }

    get size(): number {
        return this._ls.size;
    }

    get peek(): T {
        return this._ls.head;
    }
    
    public push(value: T): void {
        this._ls.insertFirst(value);
    }

    public pop(): T {
        return this._ls.removeFirst();
    }

    public print(): void {
        this._ls.print();
    }
}