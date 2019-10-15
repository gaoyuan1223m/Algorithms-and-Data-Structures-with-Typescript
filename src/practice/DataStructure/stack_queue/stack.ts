/**
 * @Last_In_and_First_Out
 * 
 * Push()
 * Pop()
 */
import { LinkedList } from "../linked-list/linked-list";

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

    public pop(): T {
        return this._as.pop();
    }

    public print(): void {
        console.log(this._as);
    }
}

export class LinkedListStack<T> {

    private _ls: LinkedList<T>;

    constructor() {
        this._ls = new LinkedList<T>();
    }

    get size(): number {
        return this._ls.size;
    }

    get peek(): T {
        return this._ls.first;
    }
    public push(value: T): void {
        return this._ls.addFirst(value);
    }

    public pop(): T {
        return this._ls.removeFirst();
    }

    public print(): void {
        this._ls.print();
    }
}