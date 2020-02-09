import { ILinkedList, ISinglyListNode, IArray, ITree, IDoublyListNode } from "@Interface/specific";
import { NOT_EXISTED, ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { ArrayTypes, ListTypes, TreeTypes, ListPrintOrder, PrintOrder } from "@Utils/types";
import { SinglyListNode, DoublyListNode } from "@Entity/concrete";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";
import { SortMethods } from "@Algorithm/sort";
import { ArrayFactory } from "@DataStructure/array";
import { IFactory } from "@Interface/common";
import { BinaryTreeFactory } from "@DataStructure/tree";
import { Validation, ValidateParams } from "@Utils/decorator";

export class Factory implements IFactory {

    create<T>(type: ListTypes, compare: ICompareFunc<T> = valueTypeComparison): ILinkedList<T> {
        if (!type || type === ListTypes.SINGLY) return new SinglyLinkedList<T>(compare);

        if (type === ListTypes.Doubly) return new DoublyLinkedList<T>(compare);

        // if (type === ListTypes.Circular) return new CircularSinglyLinkedList();

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }
}

class SinglyLinkedList<T> implements ILinkedList<T> {

    protected _headSentry: ISinglyListNode<T>; // Head Sentry Node 头哨兵节点
    protected _tailSentry: ISinglyListNode<T>; // Tail Sentry Node 尾哨兵节点
    protected _headPointer: ISinglyListNode<T>; // Head Node Pointer 头元素指针
    protected _tailPointer: ISinglyListNode<T>; // Tail Node Pointer 尾元素指针
    protected _size: number;

    constructor(protected compare: ICompareFunc<T>) {
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

    @Validation('value')
    append(@ValidateParams() value: T): this {
        // if (!this._isValid(value)) {
        //     throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        // }

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

    @Validation()
    updateByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {
        // if (!this._isValid(value)) {
        //     throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        // }
        const idx = this._getValidIndex(index);
        return this._updateByValidIndex(value, idx);
    }

    getByIndex(index: number): T {
        const idx = this._getValidIndex(index);
        const pointer = this._getNodeByValidIndex(idx);
        return pointer.value;
    }

    @Validation('value')
    indexOf(@ValidateParams() value: T): number {
        return this._indexOf(value);
    }

    @Validation('value')
    contains(@ValidateParams() value: T): boolean {
        return this.indexOf(value) !== NOT_EXISTED;
    }

    @Validation('value')
    remove(@ValidateParams() value: T): this {
        const idx = this.indexOf(value);

        if (idx === NOT_EXISTED) return this;

        this.removeByIndex(idx);

        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    sort(method: SortMethods = SortMethods.Quick): this {
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
        Console.OK(str);
        return this;
    }

    clear(): this {
        return this._clearCurrentList();
    }
    // O(n)
    reverse(): this {
        if (this._size < 2) return this;

        let pointer = this._headPointer;
        let standByPointer = this._headPointer;
        let prevPointer: ISinglyListNode<T> = null;
        let nextPointer: ISinglyListNode<T> = null;

        while (pointer.next) {
            nextPointer = pointer.next; // reserve next pointer
            pointer.next = prevPointer; // reverse
            prevPointer = pointer; // prev point moves forward
            pointer = nextPointer; // pointer moves forward
        }

        this._headPointer = prevPointer;
        this._tailPointer = standByPointer;

        this._headSentry.next = this._headPointer;
        this._tailPointer.next = this._tailSentry;

        return this;
    }

    // O(n)
    toArray(arrayType: ArrayTypes): IArray<T> {
        const array = ArrayFactory.create<T>(arrayType, this.compare);
        const currLength = this._size;
        for (let index = 0; index < currLength; index++) {
            let value = this._removeHeadNode();
            array.append(value);
            this._addTailNode(new DoublyListNode<T>(value)); // recover current List
        }
        return array;
    }

    toList(listType: ListTypes): ILinkedList<T> {
        const list = LinkedListFactory.create<T>(listType, this.compare);
        const currLength = this._size;

        const values = this.removeFromHead(currLength);
        list.insertAtTail(...values);

        this.insertAtTail(...values);// recover current List

        return list;
    }

    toTree(treeType: TreeTypes): ITree<T> {
        const tree = BinaryTreeFactory.create<T>(treeType, this.compare);

        const currLength = this._size;
        const values = this.removeFromHead(currLength);
        tree.appendRange(...values);

        this.insertAtTail(...values);

        return tree;
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

    protected _indexOf(validValue: T): number {
        let i = -1;
        let p = this._headPointer;
        const length = this._size;

        while (p && i < length) {
            i += 1;
            if (this.compare(p.value).isEqualTo(validValue)) return i;
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
        return value !== undefined && value !== null && !isNaN(Number(value)) && isFinite(Number(value)) && String(value) !== "";
    }

    protected _clearCurrentList(): this {
        if (this._size === 0) return this;

        this._headSentry.next = this._tailSentry;
        this._tailPointer.next = null; // cut off connection from the original last element to the TailSentry
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry;

        this._size = 0;
        return this;
    }

    /**
     *                                               HeadNode Pointer    
     *                                                      |
     *                                                      |
     *                                                      V
     *                                          index:      0           1                  n-2          n-1
     * HeadSentry: ListNode(value:null, next: NODE_0) --> NODE_0 --> NODE_1 --> ... --> NODE_n-2 --> NODE_n-1 --> TailSentry: ListNode(value：null, next: null)
     *                                          index:     -n         -n+1                 -2           -1          
     *                                                                                                   ^                                                                                       
     *                                                                                                   |
     *                                                                                                   |
     *                                                                                            TailNode Pointer 
     */
}

class DoublyLinkedList<T> implements ILinkedList<T> {

    protected _headPointer: IDoublyListNode<T>;
    protected _tailPointer: IDoublyListNode<T>;
    protected _size: number;

    constructor(protected compare: ICompareFunc<T>) {
        this._headPointer = null;
        this._tailPointer = null;
        this._size = 0;
    }

    get head(): T {
        if (this.isEmpty()) return null;

        return this._headPointer.value
    }

    get tail(): T {
        if (this.isEmpty()) return null;

        return this._tailPointer.value
    }

    get size(): number {
        return this._size;
    }

    insertAtHead(...values: T[]): this {
        for (const value of values) {
            if (!this._isValid(value)) continue;
            this._addHeadNode(new DoublyListNode<T>(value));
        }
        return this;
    }

    insertAtTail(...values: T[]): this {
        for (const value of values) {
            if (!this._isValid(value)) continue;
            this._addTailNode(new DoublyListNode<T>(value))
        }
        return this;
    }

    removeFromHead(): T;
    removeFromHead(n: number): T[];
    removeFromHead(n?: number): T | T[] {
        if (this.isEmpty() || n <= 0) return null;

        if (!n) {
            return this._removeHeadNode()
        }

        return new Array<T>(n > this._size ? this._size : ~~n).fill(null).map(this._removeHeadNode.bind(this));
    }

    removeFromTail(): T;
    removeFromTail(n: number): T[];
    removeFromTail(n?: number): T | T[] {
        if (this.isEmpty() || n <= 0) return null;

        if (!n) {
            return this._removeTailNode()
        }

        return new Array<T>(n > this._size ? this._size : ~~n).fill(null).map(this._removeTailNode.bind(this));
    }

    insertByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._insertByValidIndex(value, index < 0 ? idx + 1 : idx);
    }

    removeByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);
        return this._removeByValidIndex(idx);
    }

    updateByIndex(value: T, index: number): this {
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
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        return this._indexOf(value);
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }

    append(value: T): this {
        return this.insertAtHead(value);
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

    sort(method: SortMethods = SortMethods.Quick): this {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(order: PrintOrder = ListPrintOrder.FromHeadToTail): this {

        if (order === ListPrintOrder.FromHeadToTail) return this._printFromHeadToTail();

        if (order === ListPrintOrder.FromTailToHead) return this._printFromTailToHead();

        throw new Errors.InvalidDataType(Errors.Msg.UnacceptablePrintOrder);
    }

    clear(): this {
        return this._clearCurrentList();
    }


    toArray(arrayType: ArrayTypes): IArray<T> {
        const currLength = this._size;
        const array = ArrayFactory.create<T>(arrayType, this.compare, currLength);

        for (let index = 0; index < currLength; index++) {
            let value = this._removeHeadNode();
            array.append(value);
            this._addTailNode(new DoublyListNode<T>(value));
        }

        return array;
    }

    toList(listType: ListTypes): ILinkedList<T> {
        const list = LinkedListFactory.create<T>(listType);
        const currLength = this._size;

        const values = this.removeFromHead(currLength);
        list.insertAtTail(...values);

        this.insertAtTail(...values);

        return list;
    }

    toTree(treeType: TreeTypes): ITree<T> {
        const tree = BinaryTreeFactory.create<T>(treeType, this.compare);

        const currLength = this._size;
        const values = this.removeFromHead(currLength);
        tree.appendRange(...values);

        this.insertAtTail(...values);

        return tree;
    }

    private _printFromHeadToTail() {
        let pointer = this._headPointer;
        let idx = 0;
        let str = 'HEAD -> ';
        while (pointer && idx < this._size) {
            str += `[${pointer.value.toString()}] -> `
            pointer = pointer.next as IDoublyListNode<T>;
            idx++;
        }
        str += `TAIL`;
        Console.OK(str);
        return this;
    }

    private _printFromTailToHead() {
        let pointer = this._tailPointer;
        let idx = this._size - 1;
        let str = 'TAIL -> ';
        while (pointer && idx >= 0) {
            str += `[${pointer.value.toString()}] -> `
            pointer = pointer.prev;
            idx--;
        }
        str += `HEAD`;
        Console.Err(str);
        return this;
    }

    forEach(callbackfn: (value: T, index: number, current: ILinkedList<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: ILinkedList<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): DoublyLinkedList<U> {
        throw new Error("Method not implemented.");
    }

    protected _addHeadNode(newNode: IDoublyListNode<T>): this {

        if (this._headPointer) {
            newNode.next = this._headPointer;
            this._headPointer.prev = newNode;
            this._headPointer = newNode;
        } else {
            this._headPointer = newNode;
            this._tailPointer = this._headPointer
        }

        this._size += 1;

        return this;
    }

    protected _addTailNode(newNode: IDoublyListNode<T>): this {

        if (this._tailPointer) {
            this._tailPointer.next = newNode;
            newNode.prev = this._tailPointer;
            this._tailPointer = newNode;
        } else {
            this._tailPointer = newNode;
            this._headPointer = this._tailPointer;
        }

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

        let nextPointer = this._headPointer.next as IDoublyListNode<T>;

        this._headPointer.next = null;
        nextPointer.prev = null;

        this._headPointer = nextPointer;

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

        const value = this._tailPointer.value;

        let prevPointer = this._tailPointer.prev;

        this._tailPointer.prev = null;
        prevPointer.next = null;

        this._tailPointer = prevPointer;

        this._size -= 1;

        return value;
    }

    protected _clearCurrentList(): this {
        if (this._size === 0) return this;

        this._headPointer = null;
        this._tailPointer = null;

        this._size = 0;
        return this;
    }

    protected _insertByValidIndex(value: T, validIndex: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        const newNode = new DoublyListNode<T>(value);

        if (validIndex === 0) {
            return this._addHeadNode(newNode);
        }

        if (validIndex === this._size) {
            return this._addTailNode(newNode);
        }

        const pointer = this._getNodeByValidIndex(validIndex);
        const prevPointer = pointer.prev;

        newNode.next = pointer;
        pointer.prev = newNode;

        prevPointer.next = newNode;
        newNode.prev = prevPointer;

        this._size += 1;

        return this;
    }

    protected _removeByValidIndex(validIndex: number): T {

        if (validIndex === 0) {
            return this._removeHeadNode();
        }

        if (validIndex === this._size - 1) {
            return this._removeTailNode();
        }

        const currPointer = this._getNodeByValidIndex(validIndex);
        const currValue = currPointer.value;
        const prevPointer = currPointer.prev;

        prevPointer.next = currPointer.next;
        let pointer = currPointer.next as IDoublyListNode<T>;
        pointer.prev = prevPointer;

        currPointer.next = null;
        currPointer.prev = null;

        this._size -= 1;

        return currValue;
    }

    protected _updateByValidIndex(value: T, validIndex: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }

        const pointer = this._getNodeByValidIndex(validIndex);
        pointer.value = value;
        return this;
    }

    protected _getInvalidIndex(index: number): number {
        if (!Number.isInteger(index)) {
            throw new Errors.InvalidIndex(Errors.Msg.InvalidIdx);
        }

        if (index < 0 && index + this._size < 0 || index > this._size) {
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
        // (i < this._size) to avoid circular Linked List
        while (p && i < this._size) {
            i += 1;
            if (this.compare(p.value).isEqualTo(validValue)) return i;
            p = p.next as IDoublyListNode<T>;
        }
        return -1;
    }

    protected _getNodeByValidIndex(validIndex: number): IDoublyListNode<T> {

        if (validIndex < 0) return this._headPointer;

        let pointer: IDoublyListNode<T>;
        let idx: number;

        if (validIndex < this._size / 2) {
            idx = validIndex;
            pointer = this._headPointer;

            while (idx > 0) {
                pointer = pointer.next as IDoublyListNode<T>;
                idx -= 1;
            }

        } else {
            idx = this._size - 1;
            pointer = this._tailPointer;

            while (idx !== validIndex) {
                pointer = pointer.prev;
                idx -= 1;
            }
        }

        return pointer;
    }

    protected _isValid(value: T) {
        return value !== undefined           // 不能是undefined
            && value !== null                // 不能是null
            && !isNaN(Number(value))         // 不能是NaN
            && isFinite(Number(value))       // 不能是Infinity
            && String(value) !== "";         // 不能是空字符串  
    }

}

export const LinkedListFactory = new Factory();