import { ILinkedList, IArray, IStack } from "@Interface/specific";
import { ICollectionFactory } from "@Interface/common";
import { ArrayFactory } from "@DataStructure/array";
import { LinkedListFactory } from "@DataStructure/linked-list";
import { Validation, ValidateParams } from "@Utils/decorator";

export const StackFactory: ICollectionFactory = class StackFactory {

    /**Recommend implementing Stack by Linked List, so no parameter needs to pass */
    static create<T>(capacity?: number): IStack<T> {
        if (!capacity) return new LinkedListStack<T>();

        return new ArrayStack<T>(capacity);
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
        this._array = ArrayFactory.create<T>(capacity, capacity)
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

    clear(): this {
        this._array.clear();
        return this;
    }

}

/**
 * Implements Stack by Singly Linked List
 */
class LinkedListStack<T> implements IStack<T> {

    protected _linkedList: ILinkedList<T>

    get peek(): T {
        if (this.isEmpty()) {
            return null;
        }

        return this._linkedList.head;
    }

    get size(): number {
        return this._linkedList.size;
    };

    constructor() {
        this._linkedList = LinkedListFactory.create<T>();
    }

    push(...values: T[]): this {
        for (const value of values) {
            this._linkedList.addHeadNode(value)
        }
        return this;
    }


    pop(): T;
    pop(n: number): T[];
    pop(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        if (n) {
            return new Array(n > this._linkedList.size ? this._linkedList.size : ~~n)
                .fill(0)
                .map(() => this._linkedList.removeHeadNode());
        }

        return this._linkedList.removeHeadNode();

    }

    isEmpty(): boolean {
        return this._linkedList.size === 0;
    }

    clear(): this {
        this._linkedList.clear();
        return this;
    }
}

