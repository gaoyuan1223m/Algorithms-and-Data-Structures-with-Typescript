import { ILinkedList } from "@Interface/specific/ILinkedList";
import { IEqualsFunction, defaultEquals, NOT_EXISTED } from "@Utils/comparison";
import { Console } from "@Utils/high-light";
import { Errors } from "@Utils/Errors";

export class SinglyLinkedList<T> implements ILinkedList<T> {


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


    private _headSentry: ListNode<T>; // Head Sentry Node 头哨兵节点
    private _tailSentry: ListNode<T>; // Tail Sentry Node 尾哨兵节点
    private _headPointer: ListNode<T>; // Head Node Pointer 头元素指针
    private _tailPointer: ListNode<T>; // Tail Node Pointer 尾元素指针
    private _size: number;

    constructor(
        private isEqualsFn: IEqualsFunction<T> = defaultEquals
    ) {
        this._headSentry = new ListNode<T>();
        this._tailSentry = new ListNode<T>();
        this._headSentry.next = this._tailSentry;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    get head(): T {
        return this._headPointer.value;
    }

    get tail(): T {
        return this._tailPointer.value;
    }

    // O(1)
    addHeadNode(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addHeadNode(new ListNode<T>(value));
    }

    // O(1)
    addTailNode(value: T): this {
        return this.append(value);
    };

    append(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addTailNode(new ListNode<T>(value));
    }

    // O(1) ~ O(n)
    removeHeadNode(): this {
        if (this._size === 1) return this.clear();

        return this._removeByValidIndex(0);
    };

    // O(1) ~ O(n)
    removeTaiNode(): this {
        if (this._size === 1) return this.clear();

        return this._removeByValidIndex(this._size - 1);
    };

    // O(n)
    insertByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._insertByValidIndex(value, idx);
    }

    removeByIndex(index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._removeByValidIndex(idx);
    }

    private _removeByValidIndex = (validIndex: number): this => {

        if (this._size === 1) return this.clear();

        const preNode = this._getNodeByValidIndex(validIndex - 1);
        const delNode = preNode.next;

        preNode.next = preNode.next.next;
        delNode.next = null; // preventing single node which already doesn't belong to the Linked-List from hanging on it
        this._headPointer = this._headSentry.next;

        if (!this._tailPointer.next) {
            let pointer = this._headPointer;
            while (pointer.next.next) {
                pointer = pointer.next
            }

            this._tailPointer = pointer;
        }

        this._size -= 1;
        return this;
    }

    updateByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._updateByValidIndex(value, idx);
    };

    private _updateByValidIndex = (value: T, validIndex: number): this => {
        const pointer = this._getNodeByValidIndex(validIndex);
        pointer.value = value;
        return this;
    }

    // O(n)
    getByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);
        const pointer = this._getNodeByValidIndex(idx);
        return pointer.value;
    }

    indexOf(value: T): number {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        let i = -1;
        let p = this._headPointer;
        while (p) {
            i += 1;
            if (this.isEqualsFn(p.value, value)) return i;
            p = p.next;
        }
        return -1;
    }


    contains(value: T): boolean {
        return this.indexOf(value) !== NOT_EXISTED;
    }

    remove(value: T): this {
        const idx = this.indexOf(value);
        return this.removeByIndex(idx);
    }


    print(): this {
        let pointer = this._headPointer
        let str = 'HEAD -> ';
        while (pointer && this._isValid(pointer.value)) {
            str += `[${pointer.value.toString()}] -> `
            pointer = pointer.next;
        }
        str += `END`;
        Console.Warn(str);
        return this;
    }

    clear(): this {
        this._headSentry.next = this._tailSentry;
        this._tailPointer.next = null;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry;
        this._size = 0;
        return this;
    }

    isEmpty = (): boolean => this._size === 0;


    private _addHeadNode = (newNode: ListNode<T>) => {

        newNode.next = this._headSentry.next;
        this._headSentry.next = newNode;

        this._headPointer = this._headSentry.next;

        this._size += 1;

        if (this._size === 1) {
            this._tailPointer = this._headPointer;
        }

        return this;
    }

    private _addTailNode = (newNode: ListNode<T>): this => {

        newNode.next = this._tailSentry;
        this._tailPointer.next = newNode;

        this._tailPointer = newNode;

        this._size += 1;

        if (this._size === 1) {
            this._headPointer = this._headSentry.next;
        }

        return this;
    }

    private _insertByValidIndex = (value: T, validIndex: number): this => {
        if (validIndex === 0) {
            return this.addHeadNode(value);
        }

        if (validIndex === this._size) {
            return this.append(value);
        }

        const newNode = new ListNode<T>(value);

        const preNode = this._getNodeByValidIndex(validIndex - 1);
        newNode.next = preNode.next;
        preNode.next = newNode;
        this._size += 1;

        return this;
    }

    private _getNodeByValidIndex = (validIndex: number): ListNode<T> => {

        if (validIndex < 0) return this._headSentry;

        let pointer = this._headSentry.next;
        let i = validIndex;

        while (i > 0) {
            pointer = pointer.next;
            i--;
        }

        return pointer;
    }

    private _getInvalidIndex = (index: number): number => {

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

    private _isValid = (value: T): boolean => value !== null && (Boolean(value) || Number(value) === 0)

}

class ListNode<T> {

    public value: T;
    public next: ListNode<T>;

    constructor(value: T = null, next: ListNode<T> = null) {
        this.value = value;
        this.next = next;
    }
}


// function createSinglyListNode<T>(ctor: ISinglyListNodeConstructor<T>, value: T = null, next: ISinglyListNode<T> = null) {
//     return new ctor(value, next);
// }


// interface ISinglyListNode<T> {
//     value: T;
//     next: ISinglyListNode<T>;
// }

// interface ISinglyListNodeConstructor<T> {
//     new(value: T, next: ISinglyListNode<T>): ISinglyListNode<T>
// }

// No Sentry Linked List
// if (this._headSentry) {
//     this._tailSentry.next = newNode;
//     this._tailSentry = newNode
// } else {
//     this._headSentry = newNode;
//     this._tailSentry = this._headSentry;
// }
