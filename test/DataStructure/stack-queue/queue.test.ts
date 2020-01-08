import { IQueue } from "@Interface/specific"

describe(`Test for Queue`, () => {

    let queue: IQueue<number>;

    /**         Head (dequeue) .... Tail (enqueue)
     *         ----------------------------------
     *             5, 4, 6, 7, 8, 1, 2, 9 ....
     *         ----------------------------------
     */
    beforeAll(() => {
        queue.enqueue(5, 4, 6, 7, 8, 1, 2, 9);
    });

    it(`Return right size of the Queue`, () => {
        expect(queue.size).toBe(8);
    })

    it(`Return right value when looking at the Head`, () => {
        expect(queue.head).toBe(5);
    });

    it(`Return right value when looing at the Tail`, () => {
        expect(queue.tail).toBe(9);
    });

    it(`Remove one element from the Queue`, () => {
        expect(queue.dequeue()).toBe(5);
        expect(queue.size).toBe(7);
    });

    it(`Remove multiply elements from the Queue`, () => {
        expect(queue.dequeue(4)).toEqual([4, 6, 7, 8]);
        expect(queue.size).toBe(3);
    });

    it(`Looking at the Head of the Queue again`, () => {
        expect(queue.head).toBe(1);
    });

    it(`Enter one element to the Queue`, () => {
        queue.enqueue(3);
        expect(queue.size).toBe(4);
        expect(queue.tail).toBe(3);
    });

    it(`Remove 5 elements from the Queue (currently 4)`, () => {
        expect(queue.dequeue(5)).toEqual([1, 2, 9, 3]);
    });

    it(`Return NULL when removing element from empty Queue`, () => {
        expect(queue.dequeue()).toBe(null);
    });

    it(`Return True when calling 'isEmpty'`, () => {
        expect(queue.isEmpty()).toBe(true);
    });
})