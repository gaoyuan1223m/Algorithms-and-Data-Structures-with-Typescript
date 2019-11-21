import { IQueue } from "@Interface/specific/IQueue.Generic";
import { SinglyLinkedList } from "@DataStructure/linked-list/singly-linked-list";

/**
 * @First_In_and_First_Out
 * 
 * Enqueue()
 * Dequeue()
 */

export class ArrayQueue<T> implements IQueue<T> {
    
    append(value: T): this {
        throw new Error("Method not implemented.");
    }
    remove(value: T): this {
        throw new Error("Method not implemented.");
    }
    
    private _aq: Array<T>;

    constructor() {
        this._aq = [];
    }

    get size(): number {
        return this._aq.length;
    }

    enqueue(value: T): this {
        this._aq.push(value);
        return this;
    }

    dequeue(): T | undefined {
        return this._aq.shift();
    }

    contains(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this._aq.length === 0;
    }

    clear(): void {
        this._aq = [];
    }

    print(): void {
        console.log(this._aq);
    }
 }

export class LinkedListQueue<T> {

    private _llq: SinglyLinkedList<T>;

    constructor() {
        this._llq = new SinglyLinkedList<T>()
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



