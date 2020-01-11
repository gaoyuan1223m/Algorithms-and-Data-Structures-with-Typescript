import { ILinkedList, ISinglyListNode, IArray, ITree } from "@Interface/specific";
import { NOT_EXISTED, ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { SinglyListNode } from "@Entity/concrete";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";
import { SortMethods } from "@Algorithm/sort";


export abstract class AbstractSinglyLinkedList<T> implements ILinkedList<T> {

    abstract reverse(): this;

    abstract toArray(arrayType?: ArrayTypes): IArray<T>;
    abstract toList(listType?: ListTypes): ILinkedList<T>;
    abstract toTree(treeType?: TreeTypes): ITree<T>;

    protected _headSentry: ISinglyListNode<T>; // Head Sentry Node 头哨兵节点
    protected _tailSentry: ISinglyListNode<T>; // Tail Sentry Node 尾哨兵节点
    protected _headPointer: ISinglyListNode<T>; // Head Node Pointer 头元素指针
    protected _tailPointer: ISinglyListNode<T>; // Tail Node Pointer 尾元素指针
    protected _size: number;

    constructor() {
        this._headSentry = new SinglyListNode<T>();
        this._tailSentry = new SinglyListNode<T>();
        this._headSentry.next = this._tailSentry;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry
        this._size = 0;
    }
    
    get head(): T {
        if (this.isEmpty()) return null;

        return this._headPointer.value;
    }

    get tail(): T {
        if (this.isEmpty()) return null;

        return this._tailPointer.value;
    }

    get size(): number {
        return this._size;
    }

    append(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        return this._addTailNode(new SinglyListNode<T>(value));
    }

    insertByIndex(value: T, index: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        const idx = this._getValidIndex(index);

        return this._insertByValidIndex(value, index < 0 ? idx + 1 : idx);
    }

    insertAtHead(...values: T[]): this {
        for (const value of values) {
            if (!this._isValid(value)) continue;
            this._addHeadNode(new SinglyListNode<T>(value));
        }
        return this;
    }

    insertAtTail(...values: T[]): this {
        for (const value of values) {
            if (!this._isValid(value)) continue;
            this._addTailNode(new SinglyListNode<T>(value));
        }
        return this;
    }

    removeFromHead(): T
    removeFromHead(n: number): T[]
    removeFromHead(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        if (!n) {
            return this._removeHeadNode();
        }

        return new Array<T>(n > this._size ? this._size : ~~n).fill(null).map(this._removeHeadNode.bind(this));
    }

    removeFromTail(): T
    removeFromTail(n: number): T[]
    removeFromTail(n?: any): any {
        if (this.isEmpty() || n <= 0) return null;

        if (!n) {
            return this._removeTailNode();
        }

        return new Array<T>(n > this._size ? this._size : ~~n).fill(null).map(this._removeTailNode.bind(this));
    }

    removeByIndex(index: number): T {
        const idx = this._getValidIndex(index);

        return this._removeByValidIndex(idx);
    }

    updateByIndex(value: T, index: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }
        const idx = this._getValidIndex(index);
        return this._updateByValidIndex(value, idx);
    }

    getByIndex(index: number): T {
        const idx = this._getValidIndex(index);
        const pointer = this._getNodeByValidIndex(idx);
        return pointer.value;
    }

    indexOf(value: T, compare: ICompareFunc<T> = valueTypeComparison): number {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        return this._indexOf(value, compare);
    }

    contains(value: T): boolean {
        return this.indexOf(value) !== NOT_EXISTED;
    }

    remove(value: T): this {
        const idx = this.indexOf(value);

        if (idx === NOT_EXISTED) return this;

        this.removeByIndex(idx);

        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    sort(compare: ICompareFunc<T> = valueTypeComparison, method: SortMethods = SortMethods.Quick): this {
        throw new Error("Method not implemented.");
    }

    print(): this {
        let pointer = this._headPointer;
        let idx = 0;
        let str = 'HEAD -> ';
        while (pointer && idx < this._size) {
            str += `[${pointer.value.toString()}] -> `
            pointer = pointer.next;
            idx++;
        }
        str += `END`;
        Console.Warn(str);
        return this;
    }

    clear(): this {
        return this._clearCurrentList();
    }

    forEach(callbackfn: (value: T, index: number, current: ILinkedList<T>) => void, thisArg?: any): void {
        let p = this._headPointer;
        let idx = 0;
        while (p && idx < this._size) {
            callbackfn(p.value, idx, this);
            p = p.next;
            idx++;
        }
    }

    map<U>(callbackfn: (value: T, index: number, current: ILinkedList<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): ILinkedList<U> {
        throw new Error("Method not implemented.");
    }

    protected _addHeadNode(newNode: ISinglyListNode<T>): this {

        newNode.next = this._headSentry.next;
        this._headSentry.next = newNode;

        this._headPointer = this._headSentry.next;

        this._size += 1;

        if (this._size === 1) {
            this._tailPointer = this._headPointer;
        }

        return this;
    }

    protected _addTailNode(newNode: ISinglyListNode<T>): this {

        newNode.next = this._tailSentry;
        this._tailPointer.next = newNode;

        this._tailPointer = newNode;

        this._size += 1;

        if (this._size === 1) {
            this._headPointer = this._headSentry.next;
        }

        return this;
    }

    protected _insertByValidIndex(value: T, validIndex: number): this {
        if (validIndex === 0) {
            return this.insertAtHead(value);
        }

        if (validIndex === this._size) {
            return this.append(value);
        }

        const newNode = new SinglyListNode<T>(value);

        const preNode = this._getNodeByValidIndex(validIndex - 1);
        newNode.next = preNode.next;
        preNode.next = newNode;
        this._size += 1;

        return this;
    }

    protected _removeHeadNode(): T {
        if (this._size === 0) return null;

        if (this._size === 1) {
            const value = this._headPointer.value;
            this._clearCurrentList();
            return value;
        }

        const value = this._headPointer.value;

        this._headSentry.next = this._headSentry.next.next;
        this._headPointer.next = null;
        this._headPointer = this._headSentry.next;
        this._size -= 1;

        return value;
    }

    protected _removeTailNode(): T {
        if (this._size === 0) return null;

        if (this._size === 1) {
            const value = this._tailPointer.value;
            this._clearCurrentList();
            return value;
        }

        const preNode = this._getNodeByValidIndex(this._size - 2);
        const delNode = this._tailPointer;

        const value = delNode.value;

        preNode.next = preNode.next.next;
        delNode.next = null;

        let pointer = this._headPointer;
        while (pointer.next.next) {
            pointer = pointer.next
        }

        this._tailPointer = pointer;
        this._size -= 1;
        return value;
    }

    protected _removeByValidIndex(validIndex: number): T {
        if (this._size === 1) {
            const value = this._headPointer.value;
            this._clearCurrentList();
            return value;
        }

        if (validIndex === 0) return this._removeHeadNode();

        if (validIndex === this._size - 1) return this._removeTailNode();

        const preNode = this._getNodeByValidIndex(validIndex - 1);
        const delNode = preNode.next;

        const value = delNode.value;

        preNode.next = preNode.next.next;
        delNode.next = null; // preventing single node which already doesn't belong to the Linked-List from hanging on it

        this._size -= 1;

        return value;
    }

    protected _updateByValidIndex(value: T, validIndex: number): this {
        const pointer = this._getNodeByValidIndex(validIndex);
        pointer.value = value;
        return this;
    }

    protected _getValidIndex(index: number): number {
        if (!index && index !== 0) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        if (!Number.isInteger(index)) {
            throw new Errors.InvalidIndex(Errors.Msg.InvalidIdx);
        }

        if (index < 0 && index + this._size < 0 || index >= this._size) {
            throw new Errors.OutOfBoundary(Errors.Msg.BeyondBoundary);
        }

        if (index < 0) {
            return index + this._size;
        }

        return index;
    }

    protected _indexOf(validValue: T, compare: ICompareFunc<T>): number {
        let i = -1;
        let p = this._headPointer;
        while (p && i < this._size) {
            i += 1;
            if (compare(p.value).isEqualTo(validValue)) return i;
            p = p.next;
        }
        return -1;
    }

    protected _getNodeByValidIndex(validIndex: number): ISinglyListNode<T> {

        if (validIndex < 0) return this._headSentry;

        let pointer = this._headSentry.next;
        let i = validIndex;

        while (i > 0) {
            pointer = pointer.next;
            i--;
        }

        return pointer;
    }

    protected _isValid(value: T) {
        return value !== undefined
            && value !== null
            && Number(value) !== NaN
            && Number(value) !== Infinity
            && String(value) !== ""
    }

    protected _clearCurrentList(): this {
        if (this._size === 0) return this;

        this._headSentry.next = this._tailSentry;
        this._tailPointer.next = null;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry;

        this._size = 0;
        return this;
    }

}