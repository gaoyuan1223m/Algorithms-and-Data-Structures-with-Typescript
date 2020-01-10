import { ILimitedLinkedList, ILinkedList } from "@Interface/specific";
import { ListTypes } from "@Utils/types";
import { LinkedListFactory } from "@DataStructure/linked-list";

export class LimitedLinkedList<T> implements ILimitedLinkedList<T> {

    protected _list: ILinkedList<T>

    get head(): T {
        return this._list.head;
    }

    get tail(): T {
        return this._list.tail;
    }

    get size(): number {
        return this._list.size;
    };

    constructor(type?: ListTypes) {
        this._list = LinkedListFactory.create(type);
    }

    insertAtHead(...values: T[]): this {
        this._list.insertAtHead(...values);
        return this;
    }

    insertAtTail(...values: T[]): this {
        this._list.insertAtTail(...values);
        return this;
    }

    removeFromHead(): T;
    removeFromHead(n: number): T[];
    removeFromHead(n?: number): T | T[] {
        return this._list.removeFromHead(n);
    }
    removeFromTail(): T;
    removeFromTail(n: number): T[];
    removeFromTail(n?: number): T | T[] {
        return this._list.removeFromTail(n)
    }
    
    isEmpty(): boolean {
        return this._list.size === 0;
    }

    clear(): this {
        this._list.clear();
        return this;
    }

    // protected _remove(num: number, fromHead: boolean): T | T[] {

    //     if (this.isEmpty() || num <= 0) return null;

    //     const size = this._list.size;

    //     if (num) {
    //         return new Array(num > size ? size : ~~num)
    //             .fill(0)
    //             .map(() => fromHead ? this._list.removeHeadNode() : this._list.removeTaiNode());
    //     }

    //     return fromHead ? this._list.removeHeadNode() : this._list.removeTaiNode();
    // }

}