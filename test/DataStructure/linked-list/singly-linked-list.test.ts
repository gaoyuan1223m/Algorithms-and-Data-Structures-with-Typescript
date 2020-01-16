import { LinkedListFactory } from "@DataStructure/linked-list";
import { ILinkedList } from "@Interface/specific";
import { Errors, catchErr } from "@Utils/error-handling";
import { ListTypes, ArrayTypes, TreeTypes } from "@Utils/types";


describe(`Test for SinglyLinkedList`, () => {

    const sll: ILinkedList<number> = LinkedListFactory.create(ListTypes.Singly);

    it(`#addHeadNode - add 0`, () => {
        sll.insertAtHead(0);
        expect(sll.head).toBe(0);
        expect(sll.tail).toBe(0);
    });

    it(`#addHeadNode - add 25`, () => {
        sll.insertAtHead(25);
        expect(sll.head).toBe(25);
        expect(sll.tail).toBe(0);
    });

    it(`#addHeadNode - add 5`, () => {
        sll.insertAtHead(5);
        expect(sll.head).toBe(5);
        expect(sll.tail).toBe(0);
    });

    it(`#size of the current list`, () => {
        expect(sll.size).toBe(3);
    })

    it(`#append - append 38`, () => {
        sll.append(35);
        expect(sll.head).toBe(5)
        expect(sll.tail).toBe(35);
        expect(sll.size).toBe(4);
    })

    it(`getByIndex - get -1.5`, () => {
        expect<string>(catchErr(sll.getByIndex.bind(sll))(-1.5))
            .toBe<string>(Errors.Msg.InvalidIdx);
    })

    it(`getByIndex - get 100`, () => {
        expect<string>(catchErr(sll.getByIndex.bind(sll))(100))
            .toBe<string>(Errors.Msg.BeyondBoundary)
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
        sll.removeFromHead();
        expect(sll.head).toBe(25);
        expect(sll.tail).toBe(35);
        expect(sll.size).toBe(3);
        expect(sll.getByIndex(-3)).toBe(25);
    });

    it(`RemoveTailNode, step 1`, () => {
        sll.removeFromTail();
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
        expect<string>(catchErr(sll.indexOf.bind(sll))(undefined))
            .toBe<string>(Errors.Msg.InvalidArg);
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
    });

    xit(`#print the linked list - FIRST`, () => {
        sll.print();
    });

    it(`#remove all elements`, () => {
        sll.clear();
        expect<boolean>(sll.isEmpty()).toBe<boolean>(true);
        expect<number>(sll.size).toBe<number>(0);
    });

    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                ----------
     *     (remove) | 31 -> 11 -> 24 |-> 34 -> 18 ->| 19 -> 21 |
     *               ----------------                ----------
     *      --------------------------------------------------------
     */

    it(`#add more elements at once at HEAD`, () => {
        sll.insertAtHead(34, 24, 11, 31);
        expect(sll.head).toBe(31);
        expect(sll.tail).toBe(34);
        expect(sll.size).toBe(4);
    });

    it(`#add more elements at once at TAIL`, () => {
        sll.insertAtTail(18, 19, null, 21);
        expect(sll.tail).toBe(21);
        expect(sll.size).toBe(7);
    });

    it(`#remove more elements at once from HEAD`, () => {
        expect(sll.removeFromHead(3)).toEqual([31, 11, 24]);
        expect(sll.head).toBe(34);
        expect(sll.size).toBe(4);
    });

    it(`#remove more elements at once from TAIL`, () => {
        expect(sll.removeFromTail(2)).toEqual([21, 19]);
        expect(sll.tail).toBe(18);
        expect(sll.size).toBe(2);
    });

    xit(`#print the linked list - SECOND`, () => {
        sll.print();
    });

    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                ----------
     *               | 31 -> 11 -> 24 |-> 34 -> 18 ->| 19 -> 21 |
     *               ----------------                ----------
     *      --------------------------------------------------------
     */

    it(`#Should Transform to Static Array`, () => {
        sll
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const array = sll.toArray(ArrayTypes.Static);

        expect(array.size).toBe(sll.size);
    });

    it(`#Should Transform to Doubly Linked List`, () => {
        sll
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const list = sll.toList(ListTypes.Doubly);

        expect(list.size).toBe(sll.size);
    });

    it(`#Should Transform to BST`, () => {
        sll
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const tree = sll.toTree(TreeTypes.BST);

        expect(tree.size).toBe(7);
    });

})
