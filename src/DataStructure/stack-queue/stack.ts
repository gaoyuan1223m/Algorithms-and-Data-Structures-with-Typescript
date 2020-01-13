import { IArray, IStack, ILinkedList } from "@Interface/specific";
import { ArrayFactory } from "@DataStructure/array";
import { Validation, ValidateParams } from "@Utils/decorator";
import { ListTypes, PrintOrder, ArrayTypes } from "@Utils/types";
import { LinkedListFactory } from "@DataStructure/linked-list";

export class StackFactory {

    /**Recommend implementing Stack by Linked List, so no parameter needs to pass */
    static create<T>(capacity?: number): IStack<T> {
        if (capacity) return new ArrayStack<T>(capacity);

        return new LinkedListStack<T>();
    }

}
/**
 * Implement Stack by Dynamic Array
 */
class ArrayStack<T> implements IStack<T> {

    private _array: IArray<T>

    get peek(): T {
        if (this.isEmpty()) {
            return null;
        }

        return this._array[this._array.size - 1];
    }

    get size(): number {
        return this._array.size;
    };

    constructor(capacity: number) {
        // this._array = ArrayFactory.create<T>(capacity, capacity)
        this._array = new ArrayFactory(capacity).create<T>(ArrayTypes.Dynamic);
    }


    @Validation('value')
    push(@ValidateParams() ...values: T[]): this {
        for (const value of values) {
            this._array.append(value)
        }
        return this;
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;


        if (n) {
            return new Array(n > this._array.size ? this._array.size : ~~n)
                .fill(0)
                .map(() => this._array.removeByIndex(this._array.size - 1));
        }

        return this._array.removeByIndex(this._array.size - 1);
    }

    isEmpty(): boolean {
        return this._array.size === 0;
    }

    print(order?: PrintOrder): this {
        throw new Error("Method not implemented.");
    }

    clear(): this {
        this._array.clear();
        return this;
    }

}

/**
 * Implements Stack by Singly Linked List
 */
class LinkedListStack<T> implements IStack<T> {

    protected _list: ILinkedList<T>

    get peek(): T {
        return this._list.head;
    }

    get size(): number {
        return this._list.size;
    };

    constructor() {
        this._list = LinkedListFactory.create<T>(ListTypes.Singly);
    }

    push(...values: T[]): this {
        this._list.insertAtHead(...values);
        return this;
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any): any {
        return this._list.removeFromHead(n);

    }

    isEmpty(): boolean {
        return this._list.size === 0;
    }

    print(order?: PrintOrder): this {
        throw new Error("Method not implemented.");
    }

    clear(): this {
        this._list.clear();
        return this;
    }
}

