import { IQueue, ILinkedList } from "@Interface/specific";
import { LinkedListFactory } from "@DataStructure/linked-list";
import { ListTypes } from "@Utils/types";

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
        return this.size;
    };

    constructor() {
        this._list = LinkedListFactory.create<T>(ListTypes.Singly);
    }

    enqueue(...values: T[]): this {
        for (const value of values) {
            this._list.addTailNode(value);
        }
        return this;
    }

    dequeue(): T;
    dequeue(n: number): T[];
    dequeue(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        let size = this._list.size;

        if (n) {
            return new Array(n > size ? size : ~~n)
                .fill(0)
                .map(() => this._list.removeHeadNode())
        }

        return this._list.removeHeadNode();
    }

    isEmpty(): boolean {
        return this._list.size === 0;
    }

    clear(): this {
        this._list.clear();
        return this;
    }
}