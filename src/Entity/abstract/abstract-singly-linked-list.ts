import { ILinkedList } from "@Interface/specific/ILinkedList";
import { NOT_EXISTED, ICompareFunc } from "@Utils/compare/comparison";
import { SinglyListNode } from "@Entity/concrete/list-node";
import { Errors } from "@Utils/error-handling/errors";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types/data-types";
import { IArray } from "@Interface/specific/IArray";
import { ITree } from "@Interface/specific/ITree";
import { Console } from "@Utils/emphasiz/high-light";
import { SortMethods } from "@Algorithm/sort/sort-methods";


export abstract class AbstractSinglyLinkedList<T> implements ILinkedList<T> {
    

    abstract reverse(): this;

    abstract toArray(arrayType?: ArrayTypes): IArray<T>;
    abstract toList(listType?: ListTypes): ILinkedList<T>;
    abstract toTree(treeType?: TreeTypes): ITree<T>;

    protected _headSentry: SinglyListNode<T>; // Head Sentry Node 头哨兵节点
    protected _tailSentry: SinglyListNode<T>; // Tail Sentry Node 尾哨兵节点
    protected _headPointer: SinglyListNode<T>; // Head Node Pointer 头元素指针
    protected _tailPointer: SinglyListNode<T>; // Tail Node Pointer 尾元素指针
    protected _size: number;

    constructor(
        protected compare: ICompareFunc<T>
    ) {
        this._headSentry = new SinglyListNode<T>();
        this._tailSentry = new SinglyListNode<T>();
        this._headSentry.next = this._tailSentry;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry
        this._size = 0;
    }
    get head(): T {
        return this._headPointer.value;
    }

    get tail(): T {
        return this._tailPointer.value;
    }

    get size(): number {
        return this._size;
    }

    addHeadNode(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addHeadNode(new SinglyListNode<T>(value));
    }

    addTailNode(value: T): this {
        return this.append(value);
    }

    append(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addTailNode(new SinglyListNode<T>(value));
    }

    insertByIndex(value: T, index: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        const idx = this._getInvalidIndex(index);

        return this._insertByValidIndex(value, index < 0 ? idx + 1 : idx);
    }

    removeHeadNode(): T {
        return this._removeHeadNode();
    }

    removeTaiNode(): T {
        return this._removeTailNode();
    }

    removeByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);

        return this._removeByValidIndex(idx);
    }

    updateByIndex(value: T, index: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }
        const idx = this._getInvalidIndex(index);
        return this._updateByValidIndex(value, idx);
    }

    getByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);
        const pointer = this._getNodeByValidIndex(idx);
        return pointer.value;
    }

    indexOf(value: T): number {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._indexOf(value);
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

    sort(method?: SortMethods): this {
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

    protected _addHeadNode(newNode: SinglyListNode<T>): this {

        newNode.next = this._headSentry.next;
        this._headSentry.next = newNode;

        this._headPointer = this._headSentry.next;

        this._size += 1;

        if (this._size === 1) {
            this._tailPointer = this._headPointer;
        }

        return this;
    }

    protected _addTailNode(newNode: SinglyListNode<T>): this {

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
            return this.addHeadNode(value);
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

    protected _getInvalidIndex(index: number): number {
        if (!Number.isInteger(index)) {
            throw new Errors.InvalidIndex(Errors.Msg.InValidIdx);
        }

        if (index < 0 && index + this._size < 0 || index >= this._size) {
            throw new Errors.OutOfBoundary(Errors.Msg.BeyondBoundary);
        }

        if (index < 0) {
            return index + this._size;
        }

        return index;
    }

    protected _indexOf(validValue: T): number {
        let i = -1;
        let p = this._headPointer;
        while (p && i < this._size) {
            i += 1;
            if (this.compare(p.value).isEqualTo(validValue)) return i;
            p = p.next;
        }
        return -1;
    }

    protected _getNodeByValidIndex(validIndex: number): SinglyListNode<T> {

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
        return value !== null && (Boolean(value) || Number(value) === 0);
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