import { IArray } from "@Interface/specific/IArray";
import { Console } from "@Utils/emphasize/high-light";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types/data-types";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ITree } from "@Interface/specific/ITree";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare/comparison";
import { Errors } from "@Utils/error-handling/errors";
import { IList } from "@Interface/common/IList";
import { SortMethods } from "@Algorithm/sort/sort-methods";
import { QuickSort } from "@Algorithm/sort/quick-sort";
import { validate, validateIndex, validateValue } from "@Utils/decorator";
export abstract class AbstractArray<T> implements IArray<T> {

    [n: number]: T;

    protected _capacity: number;
    protected _incrementals: number;
    protected _size: number;
    protected _idxOfLastElm: number;

    get length(): number {
        return this._capacity;
    };

    get size(): number {
        return this._size
    };

    protected constructor(capacity: number, incrementals: number, ) {
        this._size = 0;
        this._incrementals = incrementals
        this._idxOfLastElm = -1;
        this._capacity = ~~(capacity < 0 ? 0 : capacity);
    }

    abstract insertByIndex(value: T, index: number): this

    abstract append(value: T): this;

    abstract toArray(arrayType: ArrayTypes): IArray<T>;

    abstract toList(listType: ListTypes): ILinkedList<T>;

    abstract toTree(treeType: TreeTypes): ITree<T>;

    abstract map<U>(callbackfn: (value: T, index: number, current: IList<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): IList<U>

    removeByIndex(index: number): T {
        const idx = this._getValidIndex(index);

        const value = this[idx];

        const isValidValue = this._isValidValue(this[idx]);

        for (let i = idx + 1; i <= this._idxOfLastElm; i++) {
            this[i - 1] = this[i];
        }

        for (let k = idx + 1 - this._capacity; k <= this._idxOfLastElm - this._capacity; k++) {
            this[k - 1] = this[k];
        }

        this[this._idxOfLastElm] = undefined;
        this[this._idxOfLastElm - this._capacity] = undefined;

        while (!this._isValidValue(this[this._idxOfLastElm])) {
            this._idxOfLastElm -= 1;
        } // need to refactor!!!

        if (isValidValue) {
            this._size -= 1
        };

        return value;
    }

    @validate()
    updateByIndex(@validateValue() value: T, @validateIndex() index: number): this {
        const idx = this._getValidIndex(index);
        this[idx] = value;
        this[idx - this._capacity] = value;
        return this;
    }

    getByIndex(index: number): T {
        return this[this._getValidIndex(index)]
    }

    sort(compare: ICompareFunc<T> = valueTypeComparison, sortMethod: SortMethods = SortMethods.Quick): this {
        return this._quickSort(compare);
    }

    indexOf(value: T, compare: ICompareFunc<T> = valueTypeComparison): number {
        if (!this._isValidValue(value)) return -1;

        for (let i = 0; i < this._capacity; i++) {
            if (compare(this[i]).isEqualTo(value)) {
                return i
            }
        }

        return -1;
    }

    reverse(): this {
        let i = 0, j = this._capacity - 1;
        let ii = i - this._capacity, jj = -1;
        while (i < j) {
            let temp = this[i];
            this[i] = this[j];
            this[j] = temp;

            temp = this[ii];
            this[ii] = this[jj];
            this[jj] = temp;

            i += 1;
            j -= 1;
            ii += 1;
            jj -= 1;
        }

        return this;
    }

    contains(value: T, compare?: ICompareFunc<T>): boolean {
        return this.indexOf(value, compare) !== -1;
    }

    remove(value: T, compare?: ICompareFunc<T>): this {
        const idx = this.indexOf(value, compare);

        if (idx === -1) return this;

        this.removeByIndex(idx);

        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        let str = "[ "
        for (let i = 0; i < this._capacity; i++) {
            str += `${this[i]}`;
            if ((i + 1) === this._capacity) continue;
            str += `, `
        }
        str += ` ]`;
        Console.OK(str);
        return this;
    }

    clear(): this {
        for (let i = 0; i <= this._idxOfLastElm; i++) {
            this[i] = undefined;
        }
        this._size = 0;
        return this;
    }

    forEach(callbackfn: (value: T, index: number, current: IList<T>) => void, thisArg?: any): void {
        const capacity = this._capacity;
        for (let idx = 0; idx < capacity; idx++) {
            callbackfn(this[idx], idx, this);
            this[idx - this._capacity] = this[idx];
        }
    }

    protected _getValidIndex(index: number): number {
        // if (!index && index !== 0) {
        //     throw new Errors.InvalidIndex(Errors.Msg.InValidArg);
        // }

        // if (!Number.isSafeInteger(index)) {
        //     throw new Errors.InvalidIndex(Errors.Msg.InValidIdx);
        // }

        if (index >= this._capacity || index + this._capacity < 0) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (index < 0) {
            index += this._capacity;
        }

        return index;
    }

    protected _isValidValue(value: T) {
        return value !== undefined
            && value !== null
            && Number(value) !== NaN
            && Number(value) !== Infinity
            && String(value) !== ""
    }

    protected _quickSort(compare?: ICompareFunc<T>): this {
        QuickSort(this, 0, this._capacity - 1, compare);
        QuickSort(this, 0 - this._capacity, -1, compare);
        return this;
    }

}