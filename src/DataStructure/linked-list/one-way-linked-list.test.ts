import { OneWayLinkedList } from "./one-way-linked-list";

const myLinkList = new OneWayLinkedList<number>();

myLinkList.addFirst(4);
myLinkList.addFirst(5);
myLinkList.addFirst(6);
myLinkList.addFirst(2);
console.log(myLinkList.size);
myLinkList.print();