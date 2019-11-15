import { IArray } from "@Interface/IArray";

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
        return this._size;
    }

    get = (index: number): T => this[index];


    insert = (value: T, index?: number): this => {
        const idx = this._getValidIndex(index);

        this[idx] = value;
        this._size += 1;
        return this;
    }

    update(value: T, index: number): this {

        return this;
    }

    remove(index: number): this {
        throw new Error("Method not implemented.");
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

    private _isOutOfCapacity = (index: number): boolean => {
        return this._size === this._capacity || index >= this._capacity;
    }

    private _getValidIndex(index: number): number {
        if (!index) {
            return this._size;
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