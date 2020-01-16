import { ILinkedList, IStack } from "@Interface/specific";
import { ListTypes, ListPrintOrder } from "@Utils/types";
import { LinkedListFactory } from "@DataStructure/linked-list";

export abstract class AbstractStack<T> implements IStack<T> {

    protected _list: ILinkedList<T>;
    protected _capacity: number;

    get size(): number {
        return this._list.size;;
    }

    get peek(): T {
        return this._list.head;
    };

    constructor(capacity?: number) {
        this._capacity = capacity;
        this._list = LinkedListFactory.create<T>(ListTypes.Singly);
    }

    abstract push(...values: T[]): this;

    pop(): T;
    pop(n: number): T[];
    pop(n?: number): T | T[] {
        return this._list.removeFromHead(n);
    }

    isEmpty(): boolean {
        return this._list.size === 0;
    }

    print(): this {
        this._list.print(ListPrintOrder.FromHeadToTail);
        return this;
    }

    clear(): this {
        this._list.clear();
        return this;
    };

}