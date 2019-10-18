import { ILinkedList } from "./linked-list-interface";

export class OneWayLinkedList<T> implements ILinkedList<T> {

    private _head: ListNode<T>;
    private _tail: ListNode<T>;
    private _size: number;

    constructor() {
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    get head(): T {
        return this._head.value;
    }

    get tail(): T {
        return this._tail.value;
    }

    append(value: T): this {
        const newNode = new ListNode<T>().addValue(value);

        if (this._head) {
            this._tail.next = newNode;
            this._tail = newNode
        } else {
            this._head = newNode;
            this._tail = this._head;
        }

        this._size += 1;
        return this;
    }

    insert(value: T, index: number): this {
        if (index < 0 || index > this._size) return this;

        if (index === this._size) {
            this.append(value);
            return this;
        }

        const newNode = new ListNode<T>().addValue(value);

        if (index === 0) {
            newNode.next = this._head;
            this._head = newNode;
            this._size += 1;
            return this;
        }

        const preNode = this._getNode(index - 1);
        newNode.next = preNode.next;
        preNode.next = newNode;
        this._size += 1;

        return this;
    }

    insertFirst(value: T): this {
        return this.insert(value, 0);
    }

    findbyIndex(index: number): T {
        const pointer = this._getNode(index);
        return pointer ? pointer.value : null;
    }

    indexOf(value: T): number {
        let i = -1;
        let nowNode = this._head;
        while (nowNode) {
            i += 1;
            if(nowNode.value.toString() === value.toString()) return i;
            nowNode = nowNode.next;
        }
        return -1;
    }

    removeByIndex(index: number): T {
        if (index < 0 || index > this._size) return null;

        let delNode: ListNode<T> = null;
        if(index === 0) {
            delNode = this._head;
            this._head = this._head.next;
            if(!this.head) this._tail = null;
            this._size -= 1;
            return delNode.value;
        }

        const preNode = this._getNode(index - 1);
        delNode = preNode.next;
        preNode.next = preNode.next.next;

        if(!delNode.next) this._tail = preNode;
        this._size -= 1;
        return delNode.value;
    }

    removeFirst(): T {
        return this.removeByIndex(0);
    }

    removeLast(): T {
        return this.removeByIndex(this._size - 1);
    }

    print(): void {
        let pointer = this._head;
        let str = 'HEAD -> ';
        while (pointer) {
            str += `${pointer.value} -> `
            pointer = pointer.next;
        }
        str += `END`;
        console.log(str);
    }

    clear(): void {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    private _getNode(index: number): ListNode<T> {

        if (index < 0 || index >= this._size) return null;

        let pointer = this._head;
        let i = index;

        while (i > 0) {
            pointer = pointer.next;
            i--;
        }

        return pointer;
    }

}

class ListNode<T> {

    public value: T;
    public next: ListNode<T>;

    addValue(v: T) {
        this.value = v;
        return this;
    }

    addNext(next: ListNode<T>) {
        this.next = next;
        return this;
    }

}

