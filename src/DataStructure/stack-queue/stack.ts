import { IStack, IArrayStackConstructor, ILinkedListStackConstructor } from "@Interface/specific/IStack";
import { IArray, IArrayConstructor } from "@Interface/specific/IArray";
import { DynamicArray } from "@DataStructure/array/dynamic-array";
import { Errors } from "@Utils/errors";
import { ICompareFunc, valueTypeComparison } from "@Utils/comparison";
import { ILinkedList, ILinkedListConstructor } from "@Interface/specific/ILinkedList";
import { SimpleSinglyLinkedList } from "@DataStructure/linked-list/singly-linked-list";
import { ICollectionFactory } from "@Interface/common/ICollectionFactory";

export const StackFactory: AbstactStackFactory = class StackFactory {

    static create<T>(capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IStack<T> {
        if (!capacity) return new LinkedListStack(SimpleSinglyLinkedList, ICompareFn);

        return new ArrayStack(DynamicArray, capacity, ICompareFn, incrementals);
    }

}

abstract class AbstactStackFactory implements ICollectionFactory {
    abstract create<T>(capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IStack<T>
}

const ArrayStack: IArrayStackConstructor = class Stack<T> implements IStack<T> {

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

    constructor(ctor: IArrayConstructor, capacity: number, ICompareFn: ICompareFunc<T> = valueTypeComparison, incrementals: number = 0) {
        this._array = new ctor(capacity, ICompareFn, incrementals)
    }


    push(value: T): this {
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

const LinkedListStack: ILinkedListStackConstructor = class Stack<T> implements IStack<T> {

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

    constructor(ctor: ILinkedListConstructor, ICompareFn: ICompareFunc<T> = valueTypeComparison) {
        this._linkedList = new ctor(ICompareFn);
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

