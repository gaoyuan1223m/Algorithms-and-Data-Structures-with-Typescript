
class MyLinkedList {

    private _head: ListNode;
    private _size: number;

    constructor() {
        this._head = new ListNode(null)
        this._size = 0;
    }

    public addFirst(value: any): void {
        const newNode = new ListNode(value);
        newNode.next = this._head.next;
        this._head.next = newNode;
        this._size += 1;
    }

    public print() : void {
        let pointer = this._head.next;
        let str = 'HEAD -> ';
        while (pointer) {
            str += ` ${pointer.value} ->`
            pointer = pointer.next;
        }
        str += ` END`;
        console.log(str);
    }

    get length(): number {
        return this._size;
    }


}

class ListNode {

    public value: any;
    public next: ListNode | undefined;

    constructor(value: any, next?: ListNode) {
        this.value = value;
        this.next  = next
    }

}

const myLinkList = new MyLinkedList();

myLinkList.addFirst(4);
myLinkList.addFirst(5);
myLinkList.addFirst(6);
myLinkList.addFirst(2);
console.log(myLinkList.length);
myLinkList.print();