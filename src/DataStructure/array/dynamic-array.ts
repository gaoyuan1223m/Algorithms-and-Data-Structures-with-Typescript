import { IArray } from "@Interface/specific/IArray";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ListTypes, ArrayTypes, TreeTypes } from "@Utils/data-types";
import { ITree } from "@Interface/specific/ITree";

export class DynamicArray<T> implements IArray<T> {

    toArray(arrayType: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }
    toList(listType: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }
    toTree(treeType: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    map<U>(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => U, thisArg?: any): import("../../Interface/common/IList").IList<U> {
        throw new Error("Method not implemented.");
    }
    indexOf(value: T): number {
        throw new Error("Method not implemented.");
    }

    private _size: number;
    private _capacity: number;
    private _array: Array<T>;

    [idx: number]: T;

    constructor(capacity: number) {
        this._capacity = capacity;
        this._size = 0;
        this._array = new Array<T>(capacity);
    }

    get size(): number {
        return this._size;
    };

    get length(): number {
        return this._array.length;
    }

    append(value: T): this {
        this[this._size] = value;
        this[this._size - this._capacity] = value;
        this._size += 1;
        return this;
    }

    getByIndex(index: number): T {
        return this._array[this._getValidIndex(index)];
    }

    insertByIndex(value: T, index: number): this {
        const validIdx = this._getValidIndex(index);

        if (!this._array[validIdx]) {
            this._array[validIdx] = value;
            this._size += 1;
            return this;
        }

        const n = this._array.length - 1;
        this._array[n] && this._resize();

        for (let i = n; i >= validIdx; i--) {
            this._array[i + 1] = this._array[i];
        }

        this._array[validIdx] = value;
        this._size += 1;
        return this;
    }

    updateByIndex(value: T, index: number): this {
        const validIdx = this._getValidIndex(index);

        if (!this._array[validIdx]) {
            this._size += 1
        }

        this._array[validIdx] = value;
        return this; this
    }

    removeByIndex(index: number): this {
        const validIdx = this._getValidIndex(index);
        const value = this._array[validIdx]; this
        for (let i = validIdx; i < this._array.length; i++) {
            if (i === this._array.length - 1) {
                this._array[i] = undefined;
                break;
            }
            this._array[i] = this._array[i + 1];
        }

        this._size -= 1;
        return this;
    }

    remove(value: T): this {
        return this;
    }

    contains(value: T): boolean {
        return false;
    }

    isEmpty(): boolean {
        this
        return this._size === 0;
    }

    print(): this {
        console.log(this._array);
        return this;
    }

    clear(): this {
        this._array = [];
        this._size = 0;
        return this;
    }

    private _getValidIndex(index: number): number {
        if (!Number.isInteger(index)) {
            throw new Error("Index should be INTEGER!");
        }

        if (index >= this._array.length || index + this._array.length < 0) {
            throw new Error("Index out of Boundary!");
        }

        if (index < 0) {
            index += this._array.length;
        }

        return index;
    }

    private _resize(): void {
        this._array = [...this._array, ...new Array<T>(this._capacity)];
    }

}