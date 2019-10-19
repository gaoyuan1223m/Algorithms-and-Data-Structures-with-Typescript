import { OneWayLinkedList } from "../linked-list/one-way-linked-list";

/**
 * @First_In_and_First_Out
 * 
 * Enqueue()
 * Dequeue()
 */

export class ArrayQueue<T> {

    private _aq: Array<T>;

    constructor() {
        this._aq = [];
    }

    get size(): number {
        return this._aq.length;
    }

    public enqueue(value: T): void {
        this._aq.push(value);
    }

    public dequeue(): T {
        return this._aq.shift() as T;
    }

    public print(): void {
        console.log(this._aq);
    }
 }

export class LinkedListQueue<T> {

    private _llq: OneWayLinkedList<T>;

    constructor() {
        this._llq = new OneWayLinkedList<T>()
    }

    get size(): number {
        return this._llq.size;
    }

    public enqueue(value: T): void {
        this._llq.append(value);
    }

    public dequeue(): T {
        return this._llq.removeFirst();
    }

    public print(): void {
        this._llq.print();
    }

}



