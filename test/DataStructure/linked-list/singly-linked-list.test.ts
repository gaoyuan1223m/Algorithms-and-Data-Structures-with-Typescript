import { LinkedListFactory } from "@DataStructure/linked-list";
import { ILinkedList } from "@Interface/specific";
import { Errors, catchErr } from "@Utils/error-handling";
import { ListTypes, ArrayTypes, TreeTypes } from "@Utils/types";
import { inRed } from "@Utils/emphasize";


describe(`Test for SinglyLinkedList`, () => {

    const sll: ILinkedList<number> = LinkedListFactory.create(ListTypes.SINGLY);

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
    });

    it(`#append - invalid element`, () => {
        expect(catchErr(sll.append.bind(sll))(null)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.append.bind(sll))(undefined)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.append.bind(sll))(NaN)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.append.bind(sll))(Infinity)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.append.bind(sll))("")).toContain(`Expect "number" but found "string"`);
    });

    it(`#getByIndex - get -1.5`, () => {
        expect<string>(catchErr(sll.getByIndex.bind(sll))(-1.5))
            .toBe<string>(Errors.Msg.InvalidIdx);
    })

    it(`#getByIndex - get 100`, () => {
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

    it(`${inRed("#UPDATE")} - invalid elements`, () => {
        expect(catchErr(sll.updateByIndex.bind(sll))(null, 2)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))(undefined, 2)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))(NaN, 2)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))(Infinity, 2)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))("", 3)).toContain(`Expect "number" but found "string"`);

        expect(catchErr(sll.updateByIndex.bind(sll))("5", "1")).toContain(Errors.Msg.NotANumber);
        expect(catchErr(sll.updateByIndex.bind(sll))(5, NaN)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))(5, Infinity)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.updateByIndex.bind(sll))(5, -1.5)).toContain(Errors.Msg.InvalidIdx);
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

    it(`IndexOf - Invalid Elements`, () => {
        expect(catchErr(sll.indexOf.bind(sll))(null)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.indexOf.bind(sll))(undefined)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.indexOf.bind(sll))(NaN)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.indexOf.bind(sll))(Infinity)).toContain(Errors.Msg.InvalidArg);
        expect(catchErr(sll.indexOf.bind(sll))("")).toContain(`Expect "number" but found "string"`);

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

    it(`#print the linked list - FIRST`, () => {
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

    it(`#print the linked list - SECOND`, () => {
        sll.print();
    });


    it(`#Reverse the List with 2 elements`, () => {
        sll
            .clear()
            .insertAtHead(23, 45)
            // .print()
            .reverse()
        // .print();

        expect(sll.head).toBe(23);
        expect(sll.tail).toBe(45);
    })
    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                ----------
     *     (remove) | 31 -> 11 -> 24 |-> 34 -> 18 ->| 19 -> 21 |
     *               ----------------                ----------
     *      --------------------------------------------------------
     */

    it(`#Reverse the List with multiple elements`, () => {
        sll
            .clear()
            .insertAtHead(24, 11, 31)
            .insertAtTail(34, 18, 19, 21)
            // .print()
            .reverse()
        // .print();
        expect(sll.head).toBe(21);
        expect(sll.tail).toBe(31);
    })

    /**     HEAD ............................................. TAIL  
     *      --------------------------------------------------------
     *               ----------------                ----------
     *               | 31 -> 11 -> 24 |-> 34 -> 18 ->| 19 -> 21 |
     *               ----------------                ----------
     *      --------------------------------------------------------
     */

    it(`#Should Transform to Static Array`, () => {
        sll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const array = sll.toArray(ArrayTypes.STATIC);

        expect(array.size).toBe(sll.size);
    });

    it(`#Should Transform to Doubly Linked List`, () => {
        sll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const list = sll.toList(ListTypes.Doubly);

        expect(list.size).toBe(sll.size);
    });

    it(`#Should Transform to BST`, () => {
        sll
            .clear()
            .insertAtHead(34, 24, 11, 31)
            .insertAtTail(18, 19, null, 21);

        const tree = sll.toTree(TreeTypes.BST);

        expect(tree.size).toBe(7);
    });

})
