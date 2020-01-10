import { IDeque, ILimitedLinkedList } from "@Interface/specific";
import { LimitedLinkedList } from "@Entity/concrete";

/**Implement common Deque by Doubly Linked List */

export class Deque<T> implements IDeque<T> {
    
    protected _list: ILimitedLinkedList<T>;
    
    get head(): T {
        return this._list.head;
    };    
    
    get tail(): T {
        return this._list.tail;
    }

    get size(): number {
        return this._list.size;
    }

    constructor() {
        this._list = new LimitedLinkedList<T>();
    }

    unshift(...values: T[]): this {        
        this._list.insertAtHead(...values);
        return this;
    }

    push(...values: T[]): this {
        this._list.insertAtTail(...values);
        return this;
    }

    shift(): T;
    shift(n: number): T[];
    shift(n?: any): any {
        return this._list.removeFromHead(n);
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any): any {
        return this._list.removeFromTail(n);
    }
    
    isEmpty(): boolean {
        return this._list.size === 0;
    }

    clear(): this {
        this._list.clear();
        return this;
    }

}