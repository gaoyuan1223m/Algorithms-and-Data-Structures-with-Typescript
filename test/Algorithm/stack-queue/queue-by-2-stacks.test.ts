import { inRed } from "@Utils/emphasize";
import { QueueBy2Stacks } from "@Algorithm/stack-queue";

describe(`Test Implementation of Queue by 2 Stacks`, () => {
    const queue = new QueueBy2Stacks<number>();
    const elements = [3, 7, 5, 2];
    const elements2 = [1, 4, 8, 6];

    beforeAll(() => {
        queue.enqueue(...elements);
    })

    it(`#Check ${inRed("HEAD")} of current Queue`, () => {
        expect(queue.head).toBe(elements[0])
    });

    it(`Dequeue ${inRed(2)} elements and then Enqueue ${inRed(2)} elements`, () => {
        expect(queue.dequeue(2)).toEqual([3, 7]);
        expect(queue.size).toBe(elements.length - 2);
        expect(queue.enqueue(...elements2).head).toBe(elements[2]);
        expect(queue.size).toBe(elements.length - 2 + elements2.length);
        expect(queue.isEmpty()).toBe(false);
        // queue.print();
    });

    it(`Dequeue ${inRed("ALL")} elements and check the order`, () => {
        expect(queue.dequeue(queue.size)).toEqual([...elements, ...elements2].slice(2));
        expect(queue.isEmpty()).toBe(true);
        expect(queue.dequeue()).toBe(null);
    });

    it(`Re-Dequeue ${inRed(8)} elements in the Queue`, () => {
        expect(queue.enqueue(...elements2, ...elements).size).toBe(elements.length + elements2.length);
        expect(queue.dequeue(3)).toEqual(elements2.slice(0, 3));
        expect(queue.tail).toBe(null);
        expect(queue.print().clear().isEmpty()).toBe(true);
    });

})