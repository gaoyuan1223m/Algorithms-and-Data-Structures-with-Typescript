import { IDeque, ILinkedList } from "@Interface/specific";
import { LinkedListFactory } from "@DataStructure/linked-list";

/**Implement common Deque by Doubly Linked List */

export class Deque<T> implements IDeque<T> {
    
    private _deque: ILinkedList<T>;
    
    get head(): T {
        return this._deque.head;
    };    
    
    get tail(): T {
        return this._deque.tail;
    }

    get size(): number {
        return this._deque.size;
    }

    constructor() {
        this._deque = LinkedListFactory.create();
    }

    addAtHead(...value: T[]): this {
        
        return this;
    }

    addAtTail(...value: T[]): this {
        return this;
    }

    popFromHead(): T;
    popFromHead(n: number): T[];
    popFromHead(n?: any): any {
        throw new Error("Method not implemented.");
    }

    popFromTail(): T;
    popFromTail(n: number): T[];
    popFromTail(n?: any): any {
        throw new Error("Method not implemented.");
    }
    
    isEmpty(): boolean {
        return this._deque.size === 0;
    }

    clear(): this {
        this._deque.clear();
        return this;
    }

}