import { ILinkedList, IArray, IStack } from "@Interface/specific";
import { ICollectionFactory } from "@Interface/common";
import { Errors } from "@Utils/error-handling";
import { ArrayFactory } from "@DataStructure/array";
import { LinkedListFactory } from "@DataStructure/linked-list";
import { Validation, ValidateParams } from "@Utils/decorator";

export const StackFactory: ICollectionFactory = class StackFactory {

    static create<T>(capacity?: number, incrementals?: number): IStack<T> {
        if (!capacity) return new LinkedListStack();

        return new ArrayStack(capacity, incrementals)
    }

}

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

    constructor(capacity: number, incrementals: number = 0) {
        this._array = ArrayFactory.create<T>(capacity, incrementals)
    }


    @Validation('value')
    push(@ValidateParams() value: T): this {
        this._array.append(value);
        return this;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoElements);
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


    push(value: T): this {
        this._linkedList.append(value);
        return this;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoElements);
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

