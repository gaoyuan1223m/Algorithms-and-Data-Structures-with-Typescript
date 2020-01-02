import { LinkedListFactory } from "@DataStructure/linked-list";
import { ILinkedList } from "@Interface/specific";
import { IError } from "@Interface/common";
import { Errors } from "@Utils/error-handling";
import { ListTypes } from "@Utils/types";

describe(`Test for SinglyLinkedList`, () => {

    const sll: ILinkedList<number> = LinkedListFactory.create<number>(ListTypes.Singly);

    it(`#addHeadNode - add 0`, () => {
        sll.addHeadNode(0);
        expect(sll.head).toBe(0);
        expect(sll.tail).toBe(0);
    });

    it(`#addHeadNode - add 25`, () => {
        sll.addHeadNode(25);
        expect(sll.head).toBe(25);
        expect(sll.tail).toBe(0)
    });

    it(`#addHeadNode - add 5`, () => {
        sll.addHeadNode(5);
        expect(sll.head).toBe(5);
        expect(sll.tail).toBe(0)
    });

    it(`#append - append 38`, () => {
        sll.append(35);
        expect(sll.head).toBe(5)
        expect(sll.tail).toBe(35);
    })

    it(`getByIndex - get -1.5`, () => {
        try {
            sll.getByIndex(-1.5)
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.InValidIdx);
        }
    })

    it(`getByIndex - get 100`, () => {
        try {
            sll.getByIndex(100);
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.BeyondBoundary);
        }
    })

    it(`getByIndex - get 1`, () => {
        const value = sll.getByIndex(1);
        expect(value).toBe(25);
    });

    it(`getByIndex - get -2`, () => {
        const value = sll.getByIndex(-2);
        expect(value).toBe(0);
    });

    it(`getEndNodes - step 1`, () => {
        expect(sll.head).toBe(5);
        expect(sll.tail).toBe(35);
    });

    it(`RemoveHeadNode, step 1`, () => {
        sll.removeHeadNode();
        expect(sll.head).toBe(25);
        expect(sll.tail).toBe(35);
        expect(sll.size).toBe(3);
        expect(sll.getByIndex(-3)).toBe(25);
    });

    it(`RemoveTailNode, step 1`, () => {
        sll.removeTaiNode();
        expect(sll.head).toBe(25);
        expect(sll.tail).toBe(0);
        expect(sll.size).toBe(2);
        expect(sll.getByIndex(-2)).toBe(25);
    });

    it(`RemoveByIndex - step 1`, () => {
        sll.removeByIndex(-2);
        expect(sll.size).toBe(1);
        expect(sll.head).toBe(0);
        expect(sll.tail).toBe(0);
    });

    it(`InsertByIndex, step 2`, () => {
        sll
            .insertByIndex(123, -1)
            .insertByIndex(23, -1)
            .insertByIndex(54, -2)
            .insertByIndex(10, 0)
            .insertByIndex(44, 2);
        expect(sll.getByIndex(-1)).toBe(23);
        expect(sll.getByIndex(-2)).toBe(54);
        expect(sll.getByIndex(-4)).toBe(44);
        expect(sll.size).toBe(6);
        expect(sll.tail).toBe(23);
        expect(sll.head).toBe(10);
    });

    it(`Contains ? 123 or 321`, () => {
        expect(sll.contains(123)).toBe(true);
        expect(sll.contains(321)).toBe(false);
    });

    it(`IndexOf - Invalid Element`, () => {
        try {
            sll.indexOf(undefined);
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.InValidArg);
        }
    });

    it(`IndexOf - 123 or 321`, () => {
        expect(sll.indexOf(123)).toBe(3);
        expect(sll.indexOf(321)).toBe(-1);
    });

    it(`Remove value - 23 Tail`, () => {
        sll.remove(23);
        expect(sll.size).toBe(5);
        expect(sll.head).toBe(10);
        expect(sll.tail).toBe(54);
    });

    it(`remove value - 10`, () => {
        sll.remove(10);
        expect(sll.size).toBe(4);
        expect(sll.head).toBe(0);
        expect(sll.tail).toBe(54);
    })

    it(`#print the linked list`, () => {
        sll.print();
    })
})

