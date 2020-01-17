import { ILinkedList } from "@Interface/specific"
import { LinkedListFactory } from "@DataStructure/linked-list"
import { ListPrintOrder, ListTypes, ArrayTypes, TreeTypes } from "@Utils/types";
import { catchErr, Errors } from "@Utils/error-handling";

describe(`Test for Doubly-Linked-List`, () => {

    const dll: ILinkedList<number> = LinkedListFactory.create(ListTypes.Doubly);
    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                       ----------
     *     (remove) | 31 <-> 11 <-> 24 |<-> 34 <-> 18 <->| 19 <-> 21 |
     *               ----------------                       ----------
     *      --------------------------------------------------------
     */
    beforeAll(() => {
        dll
            .insertAtHead(24, null, NaN, 11, 31)
            .insertAtTail(34, 18, 19, null, Infinity, 21);
    });

    it(`#print current doubly linked list`, () => {
        dll.print(ListPrintOrder.FromHeadToTail);
        dll.print(ListPrintOrder.FromTailToHead);
        expect(catchErr(dll.print.bind(dll))()).toBe(Errors.Msg.UnacceptablePrintOrder);
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

    it(`#Should return a series of values when removing from HEAD`, () => {
        expect(dll.removeFromHead(3)).toEqual([31, 11, 24]);
        expect(dll.size).toBe(3);
    });

    it(`#Should return a series of value when removing from TAIL`, () => {
        expect(dll.removeFromTail(2)).toEqual([21, 19]);
        expect(dll.size).toBe(1);
    });

    it(`#Should be equal HEAD and TAIL`, () => {
        expect(dll.head).toBe(dll.tail);
    });

    it(`#Should be empty`, () => {
        dll.clear();
        expect(dll.isEmpty()).toBe(true);
    });

    it(`#Should return null when NO element on the List`, () => {
        expect(dll.head).toBe(null);
        expect(dll.tail).toBe(null);
    });

    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *       2 <-> 6 <-> 8 <-> 3 <-> 4 <-> 9 <-> 7 
     *      --------------------------------------------------------
     */

    it(`#Add elements to the List`, () => {
        dll.insertAtHead(8, 6, null, 2);
        dll.insertAtTail(3, 4, 9, undefined, NaN, 7);
        expect(dll.size).toBe(7);
    });

    xit(`#Print current elements on the List`, () => {
        dll.print(ListPrintOrder.FromHeadToTail);
    });

    it(`#Get element by INVALID index`, () => {
        expect(catchErr(dll.getByIndex.bind(dll))(-1.5)).toBe(Errors.Msg.InvalidIdx);
        expect(catchErr(dll.getByIndex.bind(dll))(9)).toBe(Errors.Msg.BeyondBoundary);
    });

    it(`#Shoulde return right index of element to find`, () => {
        expect(dll.indexOf(3)).toBe(3);
        expect(dll.indexOf(11)).toBe(-1);
    });

    it(`#Shoulde return whether the element to find is on the Liste`, () => {
        expect(dll.contains(9)).toBe(true);
        expect(dll.contains(11)).toBe(false);
    });

    it(`#Should insert value by POSITIVE index`, () => {
        const val = 32;
        dll.insertByIndex(val, 4);
        expect(dll.getByIndex(-4)).toBe(val);
    });

    it(`#Should insert value by NEGATIVE index`, () => {
        const val = 22;
        dll.insertByIndex(val, -2);
        // dll.print(ListPrintOrder.FromHeadToTail);
        expect(dll.getByIndex(7)).toBe(val);
    });

    it(`Should return valid TAIL when inserting at TAIL`, () => {
        const val = 13;
        dll.insertByIndex(val, -1);
        // dll.print(ListPrintOrder.FromHeadToTail);
        expect(dll.tail).toBe(val);
        expect(dll.size).toBe(10);
    });

    it(`#Shoulde reutrn vlaid HEAD when inserting at HEAD`, () => {
        const val = 11;
        dll.insertByIndex(val, -10);
        // dll.print(ListPrintOrder.FromHeadToTail);
        expect(dll.getByIndex(-10)).toBe(11);
    });


    it(`#Should Transform to Static Array`, () => {
        dll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const array = dll.toArray(ArrayTypes.Static);

        expect(array.size).toBe(dll.size);
    });

    it(`#Should Transform to Singly Linked List`, () => {
        dll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const list = dll.toList(ListTypes.Singly);

        expect(list.size).toBe(dll.size);
    });

    it(`#Should Transform to BST`, () => {
        dll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const tree = dll.toTree(TreeTypes.BST);

        expect(tree.size).toBe(dll.size);
    });

});