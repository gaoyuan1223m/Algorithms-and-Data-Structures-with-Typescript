import { LinkedList } from "./linked-list";

const myLinkList = new LinkedList<number>();

myLinkList.addFirst(4);
myLinkList.addFirst(5);
myLinkList.addFirst(6);
myLinkList.addFirst(2);
console.log(myLinkList.size);
myLinkList.print();