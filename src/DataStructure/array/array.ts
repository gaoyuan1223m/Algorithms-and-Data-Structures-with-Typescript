import { IArrayFactory } from "@Interface/common";
import { IArray, IArrayConstructor, ILinkedList, ITree } from "@Interface/specific";
import { AbstractArray } from "@Entity/abstract";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";


export const ArrayFactory: IArrayFactory = class ArrayFactory {

    static createStaticArray<T>(capacity: number): IArray<T> {
        return this.create<T>(capacity);
    }

    static createDynamicArray<T>(capacity: number, incrementals: number = capacity): IArray<T> {
        return this.create<T>(capacity, incrementals);
    }

    static create<T>(capacity: number, incrementals: number = 0): IArray<T> {
        if (incrementals === 0) return new StaticArray(capacity);

        return new DynamicArray(capacity, incrementals);
    }

}


const StaticArray: IArrayConstructor = class StaticArray<T> extends AbstractArray<T> {

    constructor(capacity: number) {
        super(capacity, 0)
    }

    // O(1)
    append(value: T): this {
        if (!this._isValidValue(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        if (this._idxOfLastElm + 1 === this._capacity) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        this[this._idxOfLastElm + 1] = value;
        this[this._idxOfLastElm + 1 - this._capacity] = value;
        this._size += 1;
        this._idxOfLastElm += 1;
        return this;
    }

    // O(n)
    insertByIndex(value: T, index: number): this {
        if (!this._isValidValue(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        const idx = this._getValidIndex(index);

        if (!this._isValidValue(this[idx])) {
            this._idxOfLastElm = this._getIdxOfLastElm(idx);
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }

        let tempIdx: number; // the empty position cloest to the idx on the right

        for (let i = idx + 1; i < this._capacity; i++) {
            if (this[i]) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) { // in case no more room for the new value on it's right, we search it's left part 
            for (let i = idx - 1; i >= 0; i--) {
                if (this[i]) continue;
                tempIdx = i;
                break;
            }
        }

        if (tempIdx !== 0 && !tempIdx) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (tempIdx > idx) {
            this._idxOfLastElm = this._getIdxOfLastElm(tempIdx);

            for (let j = tempIdx; j > idx; j--) {
                this[j] = this[j - 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k > idx - this._capacity; k--) {
                this[k] = this[k - 1];
            }
            this[idx - this._capacity] = value;

        } else {
            for (let j = tempIdx; j < idx; j++) {
                this[j] = this[j + 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k < idx - this._capacity; k++) {
                this[k] = this[k + 1];
            }
            this[idx - this._capacity] = value;
        }

        this._size += 1;
        return this;
    }

    // O(n)
    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): IArray<U> {
        const capacity = this._capacity;
        const newStaticArray: IArray<U> = new StaticArray<U>(capacity);
        for (let idx = 0; idx < capacity; idx++) {
            newStaticArray[idx] = callbackfn(this[idx], idx, this);
            newStaticArray[idx - capacity] = newStaticArray[idx];
        }
        return newStaticArray;
    }

    toArray(arrayType: ArrayTypes = ArrayTypes.Dynamic): IArray<T> {
        if (arrayType = ArrayTypes.Static) return this;

        return this._toDynamicArray();
    }

    toList(listType: ListTypes = ListTypes.Singly): ILinkedList<T> {
        if (listType === ListTypes.Doubly) return this._toDoublyLinkedList();

        if (listType === ListTypes.Circular) return this._toCircularLinkedList();

        if (listType === ListTypes.Skip) return this._toSkipLinkedList();

        return this._toSinglyLinkedList();
    }

    toTree(treeType: TreeTypes = TreeTypes.BST): ITree<T> {
        if (treeType === TreeTypes.AVL) return this._toAVL();

        if (treeType === TreeTypes.R_B) return this._toRedBlack();

        return this._toBST();
    }

    private _getIdxOfLastElm(index: number): number {
        return index > this._idxOfLastElm ? index : this._idxOfLastElm;
    }

    private _toDynamicArray(): IArray<T> {
        throw new Error("Method not implemented.");
    }

    private _toSinglyLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toDoublyLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toCircularLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toSkipLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toBST(): ITree<T> {
        throw new Error("Method not implemented.");
    }

    private _toAVL(): ITree<T> {
        throw new Error("Method not implemented.");
    }

    private _toRedBlack(): ITree<T> {
        throw new Error("Method not implemented.");
    }

}

/**@NOT Completed */
const DynamicArray: IArrayConstructor = class DynamicArray<T> extends AbstractArray<T> {

    constructor(
        capacity: number,
        incremental: number = capacity
    ) {
        super(capacity, incremental);
    }

    insertByIndex(value: T, index: number): this {
        throw new Error("Method not implemented.");
    }

    append(value: T): this {
        throw new Error("Method not implemented.");
    }

    toArray(arrayType: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }

    toList(listType: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    toTree(treeType: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc: ICompareFunc<U> = valueTypeComparison, thisArg?: any): IArray<U> {
        throw new Error("Method not implemented.");
    }



    // sort(sortMethod?: import("../../Algorithm/sort/sort-methods").SortMethods): this {
    //     throw new Error("Method not implemented.");
    // }

    // toArray(arrayType: ArrayTypes): IArray<T> {
    //     throw new Error("Method not implemented.");
    // }
    // toList(listType: ListTypes): ILinkedList<T> {
    //     throw new Error("Method not implemented.");
    // }
    // toTree(treeType: TreeTypes): ITree<T> {
    //     throw new Error("Method not implemented.");
    // }

    // reverse(): this {
    //     throw new Error("Method not implemented.");
    // }
    // forEach(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => void, thisArg?: any): void {
    //     throw new Error("Method not implemented.");
    // }
    // map<U>(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => U, thisArg?: any): import("../../Interface/common/IList").IList<U> {
    //     throw new Error("Method not implemented.");
    // }
    // indexOf(value: T): number {
    //     throw new Error("Method not implemented.");
    // }

    // private _size: number;
    // private _capacity: number;
    // private _array: Array<T>;

    // [idx: number]: T;

    // constructor(capacity: number) {
    //     this._capacity = capacity;
    //     this._size = 0;
    //     this._array = new Array<T>(capacity);
    // }

    // get size(): number {
    //     return this._size;
    // };

    // get length(): number {
    //     return this._array.length;
    // }

    // append(value: T): this {
    //     this[this._size] = value;
    //     this[this._size - this._capacity] = value;
    //     this._size += 1;
    //     return this;
    // }

    // getByIndex(index: number): T {
    //     return this._array[this._getValidIndex(index)];
    // }

    // insertByIndex(value: T, index: number): this {
    //     const validIdx = this._getValidIndex(index);

    //     if (!this._array[validIdx]) {
    //         this._array[validIdx] = value;
    //         this._size += 1;
    //         return this;
    //     }

    //     const n = this._array.length - 1;
    //     this._array[n] && this._resize();

    //     for (let i = n; i >= validIdx; i--) {
    //         this._array[i + 1] = this._array[i];
    //     }

    //     this._array[validIdx] = value;
    //     this._size += 1;
    //     return this;
    // }

    // updateByIndex(value: T, index: number): this {
    //     const validIdx = this._getValidIndex(index);

    //     if (!this._array[validIdx]) {
    //         this._size += 1
    //     }

    //     this._array[validIdx] = value;
    //     return this; this
    // }

    // removeByIndex(index: number): this {
    //     const validIdx = this._getValidIndex(index);
    //     const value = this._array[validIdx]; this
    //     for (let i = validIdx; i < this._array.length; i++) {
    //         if (i === this._array.length - 1) {
    //             this._array[i] = undefined;
    //             break;
    //         }
    //         this._array[i] = this._array[i + 1];
    //     }

    //     this._size -= 1;
    //     return this;
    // }

    // remove(value: T): this {
    //     return this;
    // }

    // contains(value: T): boolean {
    //     return false;
    // }

    // isEmpty(): boolean {
    //     this
    //     return this._size === 0;
    // }

    // print(): this {
    //     console.log(this._array);
    //     return this;
    // }

    // clear(): this {
    //     this._array = [];
    //     this._size = 0;
    //     return this;
    // }

    // private _getValidIndex(index: number): number {
    //     if (!Number.isInteger(index)) {
    //         throw new Error("Index should be INTEGER!");
    //     }

    //     if (index >= this._array.length || index + this._array.length < 0) {
    //         throw new Error("Index out of Boundary!");
    //     }

    //     if (index < 0) {
    //         index += this._array.length;
    //     }

    //     return index;
    // }

    // private _resize(): void {
    //     this._array = [...this._array, ...new Array<T>(this._capacity)];
    // }

}