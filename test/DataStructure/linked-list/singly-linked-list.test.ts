import { SinglyLinkedList } from "@DataStructure/linked-list/singly-linked-list";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { IError } from "@Interface/common/IError";
import { Errors } from "@Utils/Errors";

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

    it(`getByIndex - get -1.5`, () => {
        try {
            myLinkList.getByIndex(-1.5)
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.InValidIdx);
        }
    })

    it(`getByIndex - get 100`, () => {
        try {
            myLinkList.getByIndex(100);
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.BeyondBoundary);
        }
    })

    it(`getByIndex - get 1`, () => {
        const value = myLinkList.getByIndex(1);
        expect(value).toBe(25);
    });

    it(`getByIndex - get -2`, () => {
        const value = myLinkList.getByIndex(-2);
        expect(value).toBe(0);
    });


    it(`getEndNodes`, () => {
        expect(myLinkList.head).toBe(5);
        expect(myLinkList.tail).toBe(35);
    })

    it(`#print the linked list`, () => {
        myLinkList.print();
    })
})

