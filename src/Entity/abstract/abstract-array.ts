import { IArray, ILinkedList, ITree } from "@Interface/specific";
import { IList } from "@Interface/common";
import { Console } from "@Utils/emphasize";
import { ArrayTypes, ListTypes, TreeTypes, ListPrintOrder } from "@Utils/types";
import { ICompareFunc } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { QuickSort, BubbleSort, SortMethods, SelectionSort, HeapSort } from "@Algorithm/sort";
import { Validation, ValidateParams, PositiveSafeInt, SafeInt } from "@Utils/decorator";
import { ArrayFactory } from "@DataStructure/array";
import { LinkedListFactory } from "@DataStructure/linked-list";
import { BinaryTreeFactory } from "@DataStructure/tree";

export abstract class AbstractArray<T> implements IArray<T> {

    [n: number]: T; // index signature to present Array

    @PositiveSafeInt()
    protected _capacity: number;

    @PositiveSafeInt()
    protected _incrementals: number;

    @PositiveSafeInt()
    protected _size: number;

    @SafeInt()
    protected _idxOfLastElm: number;

    protected _compare: ICompareFunc<T>;

    get length(): number {
        return this._capacity;
    };

    get size(): number {
        return this._size
    };

    get head(): T {
        return this[0];
    }

    get tail(): T {
        return this[this._capacity - 1];
    }

    get isInIncreasingOrder(): boolean {
        if (this._size < 2) {
            return true;
        }

        for (let i = 1; i < this._size; i++) {
            const isIncreasing = this._compare(this[i]).isLargerOrEqualTo(this[i - 1]);

            if (isIncreasing) {
                continue;
            }

            return false;
        }

        return true;
    }

    constructor(capacity: number, compare: ICompareFunc<T>, incrementals: number) {
        this._size = 0;
        this._idxOfLastElm = -1;
        this._capacity = capacity;
        this._compare = compare;
        this._incrementals = incrementals
    }

    abstract insertByIndex(value: T, index: number): this

    abstract append(value: T): this;

    abstract map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): IArray<U>

    toArray(arrayType: ArrayTypes): IArray<T> {
        const currLength = this._capacity;
        const array = ArrayFactory.create<T>(arrayType, this._compare, currLength);

        for (let index = 0; index < currLength; index++) {
            if (!this[index]) continue;
            array.append(this[index])
        }

        return array;
    }

    toList(listType: ListTypes): ILinkedList<T> {
        const currLength = this._capacity;
        const list = LinkedListFactory.create<T>(listType);

        for (let index = 0; index < currLength; index++) {
            if (!this[index]) continue;
            list.append(this[index]);
        }

        return list;
    }

    toTree(treeType: TreeTypes): ITree<T> {
        const currLength = this._capacity;
        const tree = BinaryTreeFactory.create<T>(treeType, this._compare);

        for (let index = 0; index < currLength; index++) {
            if (!this[index]) continue;
            tree.append(this[index]);
        }

        return tree;
    }


    @Validation('index')
    removeByIndex(@ValidateParams('number') index: number): T {

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

    @Validation()
    updateByIndex(@ValidateParams() value: T, @ValidateParams('number') index: number): this {

        const idx = this._getValidIndex(index);
        this[idx] = value;
        this[idx - this._capacity] = value;
        return this;
    }

    @Validation('index')
    getByIndex(@ValidateParams('number') index: number): T {
        return this[this._getValidIndex(index)]
    }

    sort(sortMethod: SortMethods = SortMethods.Quick): this {
        if (sortMethod === SortMethods.Bubble) {
            return this._bubbleSort(this._compare);
        }

        if (sortMethod === SortMethods.Selection) {
            return this._selectionSort(this._compare);
        }

        if (sortMethod === SortMethods.HEAP) {
            return this._heapSort(this._compare);
        }

        return this._quickSort(this._compare);
    }

    @Validation('value')
    indexOf(@ValidateParams() value: T): number {

        for (let i = 0; i < this._capacity; i++) {
            if (this._compare(this[i]).isEqualTo(value)) {
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

        this._idxOfLastElm = this._findNewIdxOfLastElm();

        return this;
    }

    @Validation('value')
    contains(@ValidateParams() value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    @Validation('value')
    remove(@ValidateParams() value: T): this {
        const idx = this.indexOf(value);

        if (idx === -1) return this;

        this.removeByIndex(idx);

        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(order: ListPrintOrder = ListPrintOrder.FromHeadToTail): this {

        if (order === ListPrintOrder.FromHeadToTail) return this._printFromHeadToTail();

        if (order === ListPrintOrder.FromTailToHead) return this._printFromTailToHead();

        throw new Errors.InvalidArgument(Errors.Msg.UnacceptablePrintOrder);
    }

    clear(): this {
        for (let i = 0; i <= this._idxOfLastElm; i++) {
            this[i] = undefined;
            this[i - this._capacity] = undefined;
        }
        this._idxOfLastElm = -1;
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

        if (index >= this._capacity || index + this._capacity < 0) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (index < 0) {
            return index + this._capacity;
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

        this._mapNegativeIndex()

        this._idxOfLastElm = this._findNewIdxOfLastElm();

        return this;
    }

    private _bubbleSort(compare?: ICompareFunc<T>): this {
        BubbleSort(this, 0, this._capacity - 1, compare);

        this._mapNegativeIndex()

        this._idxOfLastElm = this._findNewIdxOfLastElm();

        return this;
    }

    private _selectionSort(compare?: ICompareFunc<T>): this {
        SelectionSort(this, 0, this._capacity - 1, compare);

        this._mapNegativeIndex()

        this._idxOfLastElm = this._findNewIdxOfLastElm();

        return this;
    }

    private _heapSort(compare?: ICompareFunc<T>): this {
        HeapSort(this, 0, this._capacity - 1, compare);

        this._mapNegativeIndex()

        this._idxOfLastElm = this._findNewIdxOfLastElm();

        return this;
    }

    protected _findNewIdxOfLastElm(): number {
        let kk = this._capacity - 1;
        while (!this[kk] && kk >= 0) { kk -= 1; }

        return kk;
    }

    protected _mapNegativeIndex() {
        let kk = 0 - this._capacity;
        while (kk < 0) {
            this[kk] = this[kk + this._capacity];
            kk += 1;
        }
    }

    private _printFromHeadToTail(): this {
        let str = "[ "
        for (let i = 0; i <= this._idxOfLastElm; i++) {
            str += `${this[i]}`;
            if (i === this._idxOfLastElm) break;
            str += `, `
        }
        str += ` ]`;
        Console.OK(`Array Printing from HEAD to TAIL: ${str}`);
        return this;
    }

    private _printFromTailToHead(): this {
        let str = "[ "
        for (let i = this._idxOfLastElm - 1; i >= 0; i--) {
            str += `${this[i]}`;
            if (i === 0) break;
            str += `, `
        }
        str += ` ]`;
        Console.OK(`Array Printing from TAIL to HEAD: ${str}`);
        return this;
    }

}