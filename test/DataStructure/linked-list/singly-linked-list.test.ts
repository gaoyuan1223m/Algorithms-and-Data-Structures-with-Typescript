import { SinglyLinkedList } from "@DataStructure/linked-list/singly-linked-list";
import { ILinkedList } from "@Interface/specific/ILinkedList";

describe(`Test for SinglyLinkedList`, () => {

    const myLinkList: ILinkedList<number> = new SinglyLinkedList<number>();

    it(`#addHeadNode - add 0`, () => {
        myLinkList.addHeadNode(0);
        expect(myLinkList.head).toBe(0);
        expect(myLinkList.tail).toBe(0);
    });

    it(`#addHeadNode - add 25`, () => {
        myLinkList.addHeadNode(25);
        expect(myLinkList.head).toBe(25);
        expect(myLinkList.tail).toBe(0)
    });

    it(`#addHeadNode - add 5`, () => {
        myLinkList.addHeadNode(5);
        expect(myLinkList.head).toBe(5);
        expect(myLinkList.tail).toBe(0)
    });

    it(`#append - append 38`, () => {
        myLinkList.append(35);
        expect(myLinkList.head).toBe(5)
        expect(myLinkList.tail).toBe(35);
    })

    it(`#print the linked list`, () => {
        myLinkList.print();
    })
})

