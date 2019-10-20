import { IArray } from "./dynamic-array-interface";

export class DynamicArray<T> implements IArray<T> {

    private _size: number;
    private _capacity: number;
    private _array: Array<T>;

    constructor(capacity: number) {
        this._capacity = capacity;
        this._size = 0;
        this._array = new Array<T>(capacity);
    }

    get size(): number {
        return this._size;
    }

    get(index: number): T {
        return this._array[this._getValidIndex(index)];
    }

    insert(value: T, index: number): this {
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

    update(value: T, index: number): this {
        const validIdx = this._getValidIndex(index);

        if (!this._array[validIdx]) {
            this._size += 1
        }

        this._array[validIdx] = value;
        return this;
    }

    remove(index: number): this {
        const validIdx = this._getValidIndex(index);

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

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): void {
        console.log(this._array);
    }

    clear(): void {
        this._array = [];
        this._size = 0;
    }

    private _getValidIndex(index: number): number {
        if (index >= this._array.length || index + this._size < 0) {
            throw new Error("Index out of Boundary!");
        }

        if (index < 0) {
            index += this._size;
        }

        return index;
    }

    private _resize(): void {
        this._array = [...this._array, ...new Array<T>(this._capacity)];
    }

}