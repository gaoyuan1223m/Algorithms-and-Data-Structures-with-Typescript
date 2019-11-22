import { ILinkedList } from "@Interface/specific/ILinkedList";
import { IEqualsFunction, defaultEquals } from "@Utils/comparison";
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
    append(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addTailNode(new ListNode<T>(value));
    }

    // O(n)
    insertByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);

        if (idx === this._size) {
            this.append(value);
            return this;
        }

        const newNode = new ListNode<T>(value)

        if (index === 0) {
            newNode.next = this._headSentry;
            this._headSentry = newNode;
            this._size += 1;
            return this;
        }

        const preNode = this._getNodeByIndex(index - 1);
        newNode.next = preNode.next;
        preNode.next = newNode;
        this._size += 1;

        return this;
    }

    // O(n)
    getByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);
        const pointer = this._getNodeByIndex(idx);
        return pointer.value;
    }

    indexOf(value: T): number {
        let i = -1;
        let nowNode = this._headSentry;
        while (nowNode) {
            i += 1;
            if (nowNode.value.toString() === value.toString()) return i;
            nowNode = nowNode.next;
        }
        return -1;
    }

    removeByIndex(index: number): T {
        if (index < 0 || index > this._size) return null;

        let delNode: ListNode<T> = null;
        if (index === 0) {
            delNode = this._headSentry;
            this._headSentry = this._headSentry.next;
            if (!this.head) this._tailSentry = null;
            this._size -= 1;
            return delNode.value;
        }

        const preNode = this._getNodeByIndex(index - 1);
        delNode = preNode.next;
        preNode.next = preNode.next.next;

        if (!delNode.next) this._tailSentry = preNode;
        this._size -= 1;
        return delNode.value;
    }

    updateByIndex: (value: T, index: number) => this;

    contains(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    remove(value: T): this {
        throw new Error("Method not implemented.");
    }


    print(): void {
        let pointer = this._headPointer
        let str = 'HEAD -> ';
        while (pointer && this._isValid(pointer.value)) {
            str += `[${pointer.value.toString()}] -> `
            pointer = pointer.next;
        }
        str += `END`;
        Console.Warn(str);
    }

    clear(): void {
        this._headSentry.next = this._tailSentry;
        this._tailPointer.next = null;
        this._headPointer = this._headSentry;
        this._tailPointer = this._headSentry;
        this._size = 0;
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

    private _getNodeByIndex = (index: number): ListNode<T> => {

        let pointer = this._headSentry.next;
        let i = index;

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
