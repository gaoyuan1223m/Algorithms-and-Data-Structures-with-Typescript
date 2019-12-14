import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types/data-types";
import { IArray } from "@Interface/specific/IArray";
import { ITree } from "@Interface/specific/ITree";
import { IList } from "@Interface/common/IList";
import { SortMethods } from "@Algorithm/sort/sort-methods";

export class DoublyLinkedList<T> implements ILinkedList<T> {
    
    sort(method?: SortMethods): this {
        throw new Error("Method not implemented.");
    }

    private _headPointer: ListNode<T>;
    private _tailPointer: ListNode<T>;
    private _size: number;

    constructor() {
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
        throw new Error("Method not implemented.");
    }
    addTailNode(value: T): this {
        throw new Error("Method not implemented.");
    }
    removeHeadNode(): T {
        throw new Error("Method not implemented.");
    }
    removeTaiNode(): T {
        throw new Error("Method not implemented.");
    }
    insertByIndex(value: T, index: number): this {
        throw new Error("Method not implemented.");
    }
    removeByIndex(index: number): T {
        throw new Error("Method not implemented.");
    }
    updateByIndex(value: T, index: number): this {
        throw new Error("Method not implemented.");
    }
    getByIndex(index: number): T {
        throw new Error("Method not implemented.");
    }
    indexOf(value: T): number {
        throw new Error("Method not implemented.");
    }
    reverse(): this {
        throw new Error("Method not implemented.");
    }
    append(value: T): this {
        throw new Error("Method not implemented.");
    }
    contains(value: T): boolean {
        throw new Error("Method not implemented.");
    }
    remove(value: T): this {
        throw new Error("Method not implemented.");
    }
    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
    print(): this {
        throw new Error("Method not implemented.");
    }
    clear(): this {
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
    forEach(callbackfn: (value: T, index: number, current: IList<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    map<U>(callbackfn: (value: T, index: number, current: IList<T>) => U, thisArg?: any): IList<U> {
        throw new Error("Method not implemented.");
    }

}

class ListNode<T> {

    public value: T;
    public prev: ListNode<T>;
    public next: ListNode<T>;

    constructor(value: T, prev?: ListNode<T>, next?: ListNode<T>) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}