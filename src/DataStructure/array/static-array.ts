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

    get = (index: number): T => this[index];


    insert = (value: T, index?: number): this => {
        if(this._size === this._capacity || index >= this._capacity) {
            throw new Error("Out of the Capacity!");
        }
        this[index ? index : this._size] = value;
        this._size += 1;
        return this;
    }

    update(value: T, index: number): this {
        throw new Error("Method not implemented.");
    }

    remove(index: number): this {
        throw new Error("Method not implemented.");
    }

    contains(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    isEmpty = (): boolean => this._size === 0;

    print = (): void => {
        throw new Error("Method not implemented.");
    }

    clear = (): void => {
        throw new Error("Method not implemented.");
    }

}