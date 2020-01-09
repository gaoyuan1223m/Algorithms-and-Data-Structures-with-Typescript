import { ILinkedList } from "@Interface/specific"
import { LinkedListFactory } from "@DataStructure/linked-list"

describe(`Test for Doubly-Linked-List`, () => {

    const dll: ILinkedList<number> = LinkedListFactory.create<number>();

    beforeAll(() => {
        dll.append(7);
    });

    it(`#Should return right size of List`, () => {
        expect(dll.size).toBe(1);
    });

    it(`#Should return same value of Head and Tail`, () => {
        expect(dll.head).toBe(dll.tail);
    });
})