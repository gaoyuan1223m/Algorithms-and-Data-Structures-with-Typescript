import { Deque } from "@DataStructure/stack-queue"
import { IDeque } from "@Interface/specific"

describe(`Test for Deque`, () => {

    const deque: IDeque<number> = new Deque<number>();

    /**
     *   HEAD ............... Tail  
     *   -------------------------
     *    8, 2, 5, 3, 9, 4, 7, 6
     *   -------------------------
     */
    beforeAll(() => {
        deque
            .unshift(3, 5, 2, 8)
            .push(9, 4, 7, 6);
    })

    it(`#Should return right size`, () => {
        expect(deque.size).toBe(8)
    });

    it(`#Should have right head value`, () => {
        expect(deque.head).toBe(8);
    });

    it(`#Should have right tail value`, () => {
        expect(deque.tail).toBe(6);
    });

    it(`#Should return A value from Head`, () => {
        expect(deque.shift()).toBe(8);
        expect(deque.size).toBe(7);
    });

    it(`#Should return values from Head`, () => {
        expect(deque.shift(2)).toEqual([2, 5]);
        expect(deque.size).toBe(5);
    });

    it(`#Should return A value from Tail`, () => {
        expect(deque.pop()).toBe(6);
        expect(deque.size).toBe(4);
    });

    it(`#Shoulde return NULL when passing invalid number`, () => {
        expect(deque.shift(-1.34)).toBe(null);
        expect(deque.pop(-1.23)).toBe(null);
    });

    it(`#Should return values from Tail`, () => {
        expect(deque.pop(3)).toEqual([7, 4, 9]);
        expect(deque.size).toBe(1);
    });

    it(`#Is Deque empty or not at current`, () => {
        expect(deque.isEmpty()).toBe(false);
    });

    it(`#Is Deque empty after clear()`, () => {
        deque.clear();
        expect(deque.isEmpty()).toBe(true);
    });

    it(`#Should return NULL when Deque is empty`, () => {
        expect(deque.shift()).toBe(null);
        expect(deque.pop()).toBe(null);
    });
    
})