import { Deque } from "@DataStructure/stack-queue"
import { IDeque } from "@Interface/specific"

describe(`Test for Deque`, () => {

    const deque: IDeque<number> = new Deque<number>();

    beforeAll(() => {
        deque
            .addAtHead(3, 5, 2, 8)
            .addAtTail(9, 4, 7, 6);
    })

    it(`#Should return right size`, () => {
        expect(deque.size).toBe(8)
    });

    it(`#Should have right head value`, () => {
        expect(deque.head).toBe(8);
        expect(deque.size).toBe(8);
    });

    it(`#Should have right tail value`, () => {
        expect(deque.tail).toBe(6);
        expect(deque.size).toBe(8);
    });

    it(`#Should return A value from Head`, () => {
        expect(deque.popFromHead()).toBe(8);
        expect(deque.size).toBe(7);
    });

    it(`#Should return values from Head`, () => {
        expect(deque.popFromHead(2)).toEqual([2, 5]);
        expect(deque.size).toBe(5);
    });

    it(`#Should return A value from Tail`, () => {
        expect(deque.popFromTail()).toBe(6);
        expect(deque.size).toBe(4);
    });

    it(`#Should return values from Tail`, () => {
        expect(deque.popFromHead(3)).toEqual([7, 4, 9]);
        expect(deque.size).toBe(1);
    });

    it(`#Is Deque empty or not at current`, () => {
        expect(deque.isEmpty()).toBe(false);
    });

    it(`#Is Deque empty after clear()`, () => {
        deque.clear();
        expect(deque.isEmpty()).toBe(true);
    })
})