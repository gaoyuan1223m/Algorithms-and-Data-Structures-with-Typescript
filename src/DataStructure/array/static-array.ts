import { IArray } from "@Interface/specific/IArray";

export class StaticArray<T> implements IArray<T> {

    [n: number]: T;

    private _size: number;
    private _capacity: number;

    constructor(capacity: number) {
        this._size = 0
        this._capacity = capacity;
    }

    get size(): number {
        return this._size;
    };

    get length(): number {
        return this._capacity;
    }


    append = (value: T): this => {
        this[this._size] = value;
        this[this._size - this._capacity] = value;
        this._size += 1;
        return this;
    }

    getByIndex = (index: number): T => {
        return this[this._getValidIndex(index)];
    }

    insertByIndex = (value: T, index: number): this => {
        const idx = this._getValidIndex(index);

        if (!this[idx]) {
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }

        let tempIdx: number;
        for (let i = idx + 1; i < this._capacity; i++) {
            if (this[i]) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) {
            throw new Error('Fail to insert new Element since the Array is Full!');
        }

        for (let j = tempIdx; j > idx; j--) {
            this[j] = this[j - 1];
        }
        this[idx] = value;

        for (let k = tempIdx - this._capacity; k > idx - this._capacity; k--) {
            this[k] = this[k - 1];
        }
        this[idx - this._capacity] = value;

        this._size += 1;
        return this;
    }

    updateByIndex(value: T, index: number): this {
        const idx = this._getValidIndex(index);
        this[idx] = value;
        this[idx - this._capacity] = value;
        return this;
    }

    removeByIndex(index: number): T {
        throw new Error("Method not implemented.");
    }

    remove(value: T): this {
        return this;
    }

    contains(value: T): boolean {
        return false;
    }

    isEmpty = (): boolean => this._size === 0;

    print = (): void => {
        let str = "["
        for (let i = 0; i < this._size; i++) {
            str = `${str} ${this[i]}`;
        }
        str = `${str}]`;
        console.log(str);
    }

    clear = (): void => {
        throw new Error("Method not implemented.");
    }


    private _getValidIndex(index: number): number {
        if (!index) {
            throw new Error("Index is INVALID!");
        }

        if (!Number.isInteger(index)) {
            throw new Error("Index should be INTEGER!");
        }

        if (index >= this._capacity || index + this._capacity < 0) {
            throw new Error("Index out of Boundary!");
        }

        if (index < 0) {
            index += this._capacity;
        }

        return index;
    }

}