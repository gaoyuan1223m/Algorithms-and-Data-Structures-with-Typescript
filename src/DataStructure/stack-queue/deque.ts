import { IDeque, ILinkedList } from "@Interface/specific";
import { LinkedListFactory } from "@DataStructure/linked-list";

/**Implement common Deque by Doubly Linked List */

export class Deque<T> implements IDeque<T> {
    
    protected _deque: ILinkedList<T>;
    
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
        this._deque = LinkedListFactory.create<T>();
    }

    addAtHead(...values: T[]): this {        
        for (const value of values) {
            this._deque.addHeadNode(value);
        }
        return this;
    }

    addAtTail(...values: T[]): this {
        for (const value of values) {
            this._deque.addTailNode(value)
        }
        return this;
    }

    popFromHead(): T;
    popFromHead(n: number): T[];
    popFromHead(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        let size = this._deque.size;

        if (n) {
            return new Array(n > size ? size : ~~n)
                .fill(0)
                .map(() => this._deque.removeHeadNode())
        }

        return this._deque.removeHeadNode();
    }

    popFromTail(): T;
    popFromTail(n: number): T[];
    popFromTail(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        let size = this._deque.size;

        if (n) {
            return new Array(n > size ? size : ~~n)
                .fill(0)
                .map(() => this._deque.removeTaiNode())
        }

        return this._deque.removeTaiNode();
    }
    
    isEmpty(): boolean {
        return this._deque.size === 0;
    }

    clear(): this {
        this._deque.clear();
        return this;
    }

}