import { IQueue, ILinkedList } from "@Interface/specific";
import { ListTypes, ListPrintOrder } from "@Utils/types";
import { LinkedListFactory } from "@DataStructure/linked-list";

/**Implement common QUEUE by Singly Linked List */
export class Queue<T> implements IQueue<T> {

    protected _list: ILinkedList<T>;

    get head(): T {
        return this._list.head;
    }

    get tail(): T {
        return this._list.tail;
    }

    get size(): number {
        return this._list.size;
    };

    constructor() {
        this._list = LinkedListFactory.create<T>(ListTypes.SINGLY)
    }

    enqueue(...values: T[]): this {
        this._list.insertAtTail(...values);
        return this;
    }

    dequeue(): T;
    dequeue(n: number): T[];
    dequeue(n?: any): any {
        return this._list.removeFromHead(n);
    }

    isEmpty(): boolean {
        return this._list.isEmpty();
    }

    print(): this {
        this._list.print(ListPrintOrder.FromHeadToTail);
        return this;
    }

    clear(): this {
        this._list.clear();
        return this;
    }

}
