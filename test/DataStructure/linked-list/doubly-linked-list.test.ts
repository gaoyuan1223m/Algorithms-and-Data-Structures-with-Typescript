import { ILinkedList } from "@Interface/specific"
import { LinkedListFactory } from "@DataStructure/linked-list"
import { ListPrintOrder } from "@Utils/types";

describe(`Test for Doubly-Linked-List`, () => {

    const dll: ILinkedList<number> = LinkedListFactory.create<number>();
    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                       ----------
     *     (remove) | 31 <-> 11 <-> 24 |<-> 34 <-> 18 <->| 19 <-> 21 |
     *               ----------------                       ----------
     *      --------------------------------------------------------
     */
    beforeAll(() => {
        dll
            .insertAtHead(24, 11, 31)
            .insertAtTail(34, 18, 19, 21);
    });

    xit(`#print current doubly linked list`, () => { 
        dll.print(ListPrintOrder.FromHeadToTail);
        dll.print(ListPrintOrder.FromTailToHead);
    })

    it(`#Should return right size of List`, () => {
        expect(dll.size).toBe(7);
    });

    it(`#Should return same value of Head and Tail`, () => {
        expect(dll.head).toBe(31);
        expect(dll.tail).toBe(21);
    });

    it(`#Should return right value when Getting by it index`, () => {
        expect(dll.getByIndex(3)).toBe(34);
        expect(dll.getByIndex(6)).toBe(21);
    });

    it(`#Should return right value by removing by it index`, () => {
        expect(dll.removeByIndex(3)).toBe(34);
        expect(dll.size).toBe(6)
    });

    it(`#Shoud return a series of values when removing from HEAD`, () => {
        expect(dll.removeFromHead(3)).toEqual([31, 11, 24]);
        expect(dll.size).toBe(3);
    });

    it(`#Shoulde return a series of value when removing from TAIL`, () => {
        expect(dll.removeFromTail(2)).toEqual([21, 19]);
        expect(dll.size).toBe(1);
    });

    it(`#Should be equal HEAD and TAIL`, () => {
        expect(dll.head).toBe(dll.tail);
    });

    it(`#Should be empty`, () => {
        dll.clear();
        expect(dll.isEmpty()).toBe(true);
    })
})